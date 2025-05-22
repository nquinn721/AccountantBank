import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './User.entity';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { TransactionModule } from 'src/Transaction/Transaction.module';
import { TipModule } from 'src/Tip/Tip.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TransactionModule, TipModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
