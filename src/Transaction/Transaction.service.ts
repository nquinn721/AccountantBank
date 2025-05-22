import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { Transaction } from './Transaction.entity';
import { In } from 'typeorm';

@Injectable()
export class TransactionService extends TypeOrmCrudService<Transaction> {
  constructor(@InjectRepository(Transaction) repo) {
    super(repo);
  }

  async deleteMany(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await this.repo.delete({ id: In(ids) });
  }
}
