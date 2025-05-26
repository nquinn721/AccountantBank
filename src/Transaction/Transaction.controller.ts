import { Crud, CrudController } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';

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

  @Get('moneyOwed/:userId')
  async getMoneyOwed(userId: number): Promise<number> {
    return this.service.getMoneyOwed(userId);
  }
}
