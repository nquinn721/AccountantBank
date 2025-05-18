import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { Company } from './Company.entity';
import { CompaniesService } from './Company.service';

@Crud({
  model: {
    type: Company,
  },
})
@Controller('company')
export class CompaniesController implements CrudController<Company> {
  constructor(public service: CompaniesService) {}
}
