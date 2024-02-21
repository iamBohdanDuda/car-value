import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { MakesModule } from './makes/makes.module';
import { ModelsModule } from './models/models.module';
import configuration from './config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot(databaseConfig()),
    MakesModule,
    ModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
