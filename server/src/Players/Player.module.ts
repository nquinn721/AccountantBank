import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Player } from './Player.entity';
import { PlayerService } from './Player.service';
import { PlayerController } from './Player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayerService],
  exports: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule {}
