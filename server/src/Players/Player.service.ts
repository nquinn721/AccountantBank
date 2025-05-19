import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { Player } from './Player.entity';

@Injectable()
export class PlayerService extends TypeOrmCrudService<Player> {
  constructor(@InjectRepository(Player) repo) {
    super(repo);
  }
}
