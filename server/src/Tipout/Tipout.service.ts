import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { Tipout } from './Tipout.entity';

@Injectable()
export class TipoutService extends TypeOrmCrudService<Tipout> {
  constructor(@InjectRepository(Tipout) repo) {
    super(repo);
  }
}
