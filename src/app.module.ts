import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from 'nestjs-session';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { RakeModule } from './Rake/Rake.module';
import { TipModule } from './Tip/Tip.module';
import { TransactionModule } from './Transaction/Transaction.module';
import { UserModule } from './User/User.module';

@Module({
  imports: [
    SessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...configuration(),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    UserModule,
    TransactionModule,
    RakeModule,
    TipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
