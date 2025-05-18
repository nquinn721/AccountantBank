import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CompaniesModule } from './Company/Company.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
