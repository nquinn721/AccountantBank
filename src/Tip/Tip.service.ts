import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { Tip } from './Tip.entity';

@Injectable()
export class TipService extends TypeOrmCrudService<Tip> {
  constructor(@InjectRepository(Tip) repo) {
    super(repo);
  }
}
