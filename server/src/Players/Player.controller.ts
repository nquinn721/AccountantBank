import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { Player } from './Player.entity';
import { PlayerService } from './Player.service';

@Crud({
  model: {
    type: Player,
  },
  query: {
    join: {
      transactions: {
        eager: true,
      },
    },
  },
})
@Controller('player')
export class PlayerController implements CrudController<Player> {
  constructor(public service: PlayerService) {}
}
