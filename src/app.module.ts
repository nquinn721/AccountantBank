import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from 'nestjs-session';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RakeModule } from './Rake/Rake.module';
import { TipModule } from './Tip/Tip.module';
import { TransactionModule } from './Transaction/Transaction.module';
import { UserModule } from './User/User.module';
// const dbConfig = {
//   type: 'mysql' as const,
//   host: 'localhost',
//   port: 3306,
//   username: 'admin',
//   password: 'password',
//   database: 'accountant',
// };
const dbConfig = {
  type: 'mysql' as const,
  host: '10.11.33.5',
  port: 3306,
  username: 'accountantuser',
  password: 'Accountant1234',
  database: 'accountant',
};

@Module({
  imports: [
    SessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dbConfig,
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
