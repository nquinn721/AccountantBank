import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DealerTipService } from './DelaerTip.service';
import { DealerTipController } from './DealerTip.controller';
import { DealerTip } from './DealerTip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DealerTip])],
  providers: [DealerTipService],
  exports: [DealerTipService],
  controllers: [DealerTipController],
})
export class DealerTipModule {}
