import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { User } from './User.entity';
import { UserService } from './User.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
class DeleteUserTransactionsInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;
    // Delete all transactions for the user before deleting the user
    await this.userService.deleteUserTransactions(userId);
    await this.userService.deleteUserTipForeignKeys(userId);
    return next.handle();
  }
}

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      transactions: {
        eager: true,
      },
    },
  },
  routes: {
    deleteOneBase: {
      interceptors: [DeleteUserTransactionsInterceptor],
      decorators: [],
      returnDeleted: true,
    },
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
