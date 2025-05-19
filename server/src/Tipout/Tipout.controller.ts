import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { Tipout } from './Tipout.entity';
import { TipoutService } from './Tipout.service';

@Crud({
  model: {
    type: Tipout,
  },
})
@Controller('tipout')
export class TipoutController implements CrudController<Tipout> {
  constructor(public service: TipoutService) {}
}
