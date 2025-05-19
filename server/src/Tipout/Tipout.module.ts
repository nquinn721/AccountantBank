import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoutService } from './Tipout.service';
import { TipoutController } from './Tipout.controller';
import { Tipout } from './Tipout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tipout])],
  providers: [TipoutService],
  exports: [TipoutService],
  controllers: [TipoutController],
})
export class TipoutModule {}
