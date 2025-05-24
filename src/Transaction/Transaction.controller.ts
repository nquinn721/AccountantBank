import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';

import { Transaction } from './Transaction.entity';
import { TransactionService } from './Transaction.service';

@Crud({
  model: {
    type: Transaction,
  },
  // routes: {
  //   only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase'],
  // },
})
@Controller('transaction')
export class TransactionController implements CrudController<Transaction> {
  constructor(public service: TransactionService) {}
}
