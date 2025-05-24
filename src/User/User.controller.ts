import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './User.entity';
import { UserService } from './User.service';

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

@Injectable()
class TrimUserNameInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (request.body && typeof request.body.name === 'string') {
      request.body.name = request.body.name.trim();
    }
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
    createOneBase: {
      interceptors: [TrimUserNameInterceptor],
    },
    // deleteOneBase: {
    //   interceptors: [DeleteUserTransactionsInterceptor],
    //   decorators: [],
    //   returnDeleted: true,
    // },
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase'],
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
