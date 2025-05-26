import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In } from 'typeorm';
import { Transaction } from './Transaction.entity';

@Injectable()
export class TransactionService extends TypeOrmCrudService<Transaction> {
  constructor(@InjectRepository(Transaction) repo) {
    super(repo);
  }

  async deleteMany(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await this.repo.delete({ id: In(ids) });
  }

  async getMoneyOwed(userId: number): Promise<number> {
    const transactions = await this.repo.find({
      where: { user: { id: userId }, type: In(['borrow', 'paid']) },
    });
    let totalOwed = 0;
    transactions.forEach((tx) => {
      if (tx.type === 'borrow') {
        totalOwed += tx.amount;
      }
      if (tx.type === 'paid') {
        totalOwed -= tx.amount;
      }
    });
    return totalOwed;
  }
}
