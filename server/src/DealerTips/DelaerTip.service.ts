import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { DealerTip } from './DealerTip.entity';

@Injectable()
export class DealerTipService extends TypeOrmCrudService<DealerTip> {
  constructor(@InjectRepository(DealerTip) repo) {
    super(repo);
  }
}
