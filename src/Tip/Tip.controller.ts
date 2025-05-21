import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { Tip } from './Tip.entity';
import { TipService } from './Tip.service';

@Crud({
  model: {
    type: Tip,
  },
  query: {
    join: {
      user: {
        eager: true,
      },
    },
  },
})
@Controller('tip')
export class TipController implements CrudController<Tip> {
  constructor(public service: TipService) {}
}
