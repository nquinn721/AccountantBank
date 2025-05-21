import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { Rake } from './Rake.entity';

@Injectable()
export class RakeService extends TypeOrmCrudService<Rake> {
  constructor(@InjectRepository(Rake) repo) {
    super(repo);
  }
}
