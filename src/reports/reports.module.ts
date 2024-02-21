import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { MakesModule } from '../makes/makes.module';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), MakesModule, ModelsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
