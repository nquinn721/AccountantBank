import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRequest, Override } from '@dataui/crud';
import { HttpException } from '@nestjs/common';
import { TipService } from 'src/Tip/Tip.service';
import { TransactionService } from 'src/Transaction/Transaction.service';
import { TransactionUtil } from 'src/Transaction/Transaction.Util';
import { DeepPartial, In, MoreThanOrEqual } from 'typeorm';
import { IUser, User } from './User.entity';
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private transactionService: TransactionService,
    private tipService: TipService,
  ) {
    super(repo);
  }

  @Override()
  async createOne(req: CrudRequest, dto: DeepPartial<User>): Promise<User> {
    const existingUser = await this.repo.findOne({
      where: { name: dto.name?.trim() },
    });
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }

    if (!dto.name || dto.name.trim() === '') {
      throw new HttpException('User name cannot be empty', 400);
    }
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async deleteUserTransactions(userId: number): Promise<void> {
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: ['transactions'],
    });
    if (user && user.transactions) {
      const transactionIds = user.transactions.map(
        (transaction) => transaction.id,
      );
      await this.transactionService.deleteMany(transactionIds);
    }
  }

  async deleteUserTipForeignKeys(userId: number): Promise<void> {
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: ['tips'],
    });
    if (user && user.tips) {
      const tipIds = user.tips.map((tip) => tip.id);
      await this.tipService.deleteMany(tipIds);
    }
  }

  // Get all users who have borrowed money in the last 24 hours
  async currentPlayers(): Promise<IUser[]> {
    const hoursAgo = 12;
    const startTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    const transactions = await this.transactionService.find({
      where: {
        created_at: MoreThanOrEqual(startTime),
        type: In(['borrow', 'paid', 'cashout']),
      },
      relations: ['user'],
    });
    const users = {} as Record<number, IUser>;
    for (const transaction of transactions) {
      if (!users[transaction.user.id]) {
        users[transaction.user.id] = {
          id: transaction.user.id,
          name: transaction.user.name,
          isPlayer: transaction.user.isPlayer,
          isAdmin: transaction.user.isAdmin,
          isEmployee: transaction.user.isEmployee,
          transactions: [],
          moneyOwed: 0,
          totalBuyIn: 0,
        };
      }

      users[transaction.user.id].transactions.push(transaction);
    }

    for (const user of Object.values(users) as IUser[]) {
      user.moneyOwed = TransactionUtil.getTotalOwed(user.transactions || []);
      user.totalBuyIn = TransactionUtil.getTotalBuyIns(user.transactions || []);
    }
    return Object.values(users) as IUser[];
  }
}
