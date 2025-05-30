import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MoreThanOrEqual } from 'typeorm';
import { Rake } from './Rake.entity';

@Injectable()
export class RakeService extends TypeOrmCrudService<Rake> {
  constructor(@InjectRepository(Rake) repo) {
    super(repo);
  }
  async currentRakes(): Promise<Rake[]> {
    const hoursAgo = 12;
    const startTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    return this.repo.find({
      where: {
        created_at: MoreThanOrEqual(startTime),
      },
    });
  }
}
