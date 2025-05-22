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
// const dbConfig = {
//    type: 'mysql' as const,
//       host: 'localhost',
//       port: 3306,
//       username: 'admin',
//       password: 'password',
//       database: 'accountant',
// }

const dbConfig = {
  type: 'mysql' as const,
  host: 'projects/heroic-footing-460117-k8/global/networks/default',
  port: 3306,
  username: 'root',
  password: 'Root1234',
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
