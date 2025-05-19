import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { Rake } from './Rake.entity';
import { RakeService } from './Rake.service';

@Crud({
  model: {
    type: Rake,
  },
})
@Controller('rake')
export class RakeController implements CrudController<Rake> {
  constructor(public service: RakeService) {}
}
