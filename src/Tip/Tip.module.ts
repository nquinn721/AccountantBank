import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipService } from './Tip.service';
import { TipController } from './Tip.controller';
import { Tip } from './Tip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tip])],
  providers: [TipService],
  exports: [TipService],
  controllers: [TipController],
})
export class TipModule {}
