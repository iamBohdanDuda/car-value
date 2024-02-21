import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './model.entity';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { MakesModule } from '../makes/makes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Model]), MakesModule],
  controllers: [ModelsController],
  providers: [ModelsService],
  exports: [ModelsService],
})
export class ModelsModule {}
