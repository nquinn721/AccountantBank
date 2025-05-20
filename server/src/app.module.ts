import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { PlayerModule } from './Players/Player.module';
import { TransactionModule } from './Transaction/Transaction.module';
import { RakeModule } from './Rake/Rake.module';
import { DealerTipModule } from './DealerTips/DealerTip.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'accountant',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PlayerModule,
    TransactionModule,
    RakeModule,
    DealerTipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
