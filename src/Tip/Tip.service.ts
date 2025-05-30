import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, MoreThanOrEqual } from 'typeorm';
import { Tip } from './Tip.entity';

@Injectable()
export class TipService extends TypeOrmCrudService<Tip> {
  constructor(@InjectRepository(Tip) repo) {
    super(repo);
  }
  async deleteMany(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await this.repo.delete({ id: In(ids) });
  }

  async currentTips(): Promise<Tip[]> {
    const hoursAgo = 12;
    const startTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    return this.repo.find({
      where: {
        created_at: MoreThanOrEqual(startTime),
      },
      relations: ['user'],
    });
  }
}
