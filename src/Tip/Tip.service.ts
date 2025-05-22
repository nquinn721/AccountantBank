import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { Tip } from './Tip.entity';
import { In } from 'typeorm';

@Injectable()
export class TipService extends TypeOrmCrudService<Tip> {
  constructor(@InjectRepository(Tip) repo) {
    super(repo);
  }
  async deleteMany(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await this.repo.delete({ id: In(ids) });
  }
}
