import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { Transaction } from './Transaction.entity';
import { TransactionService } from './Transaction.service';

@Crud({
  model: {
    type: Transaction,
  },
})
@Controller('transaction')
export class TransactionController implements CrudController<Transaction> {
  constructor(public service: TransactionService) {}
}
