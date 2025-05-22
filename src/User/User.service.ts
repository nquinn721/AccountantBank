import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { User } from './User.entity';
import { TransactionService } from 'src/Transaction/Transaction.service';
import { In } from 'typeorm';
import { TipService } from 'src/Tip/Tip.service';
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private transactionService: TransactionService,
    private tipService: TipService,
  ) {
    super(repo);
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
}
