import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { User } from './User.entity';
import { UserService } from './User.service';

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
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
