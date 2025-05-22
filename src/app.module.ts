import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
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
console.log('app module');
// const dbConfig = {
//   type: 'mysql' as const,
//   host: 'projects/heroic-footing-460117-k8/global/networks/default',
//   port: 3306,
//   username: 'accountantuser',
//   password: 'Accountant1234',
//   database: 'accountant',
// };

const dbConfig = {
  type: 'mysql' as const,
  host: '35.223.91.8',
  port: 3306,
  username: 'accountantuser',
  password: 'Accountant1234',
  database: 'accountant',
};

@Module({
  imports: [
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
