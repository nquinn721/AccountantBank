import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './User/User.module';
import { TransactionModule } from './Transaction/Transaction.module';
import { RakeModule } from './Rake/Rake.module';
import { TipModule } from './Tip/Tip.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
console.log(join(__dirname, '..', '..', 'client', 'build'));
