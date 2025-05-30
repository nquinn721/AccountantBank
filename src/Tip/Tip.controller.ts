import { Crud, CrudController } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';

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

  @Get('current-tips')
  async currentTips(): Promise<Tip[]> {
    return this.service.currentTips();
  }
}
