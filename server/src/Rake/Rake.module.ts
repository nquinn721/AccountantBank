import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RakeService } from './Rake.service';
import { RakeController } from './Rake.controller';
import { Rake } from './Rake.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rake])],
  providers: [RakeService],
  exports: [RakeService],
  controllers: [RakeController],
})
export class RakeModule {}
