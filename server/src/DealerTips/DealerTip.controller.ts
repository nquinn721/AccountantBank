import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { DealerTip } from './DealerTip.entity';
import { DealerTipService } from './DelaerTip.service';

@Crud({
  model: {
    type: DealerTip,
  },
  query: {
    join: {
      player: {
        eager: true,
      },
    },
  },
})
@Controller('dealer-tip')
export class DealerTipController implements CrudController<DealerTip> {
  constructor(public service: DealerTipService) {}
}
