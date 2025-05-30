import { Crud, CrudController } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';

import { Rake } from './Rake.entity';
import { RakeService } from './Rake.service';

@Crud({
  model: {
    type: Rake,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase'],
  },
})
@Controller('rake')
export class RakeController implements CrudController<Rake> {
  constructor(public service: RakeService) {}

  @Get('current-rakes')
  async currentRakes(): Promise<Rake[]> {
    return this.service.currentRakes();
  }
}
