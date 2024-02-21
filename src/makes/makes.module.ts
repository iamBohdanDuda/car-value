import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Make } from './make.entity';
import { MakesService } from './makes.service';
import { MakeController } from './make.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Make])],
  controllers: [MakeController],
  providers: [MakesService],
  exports: [MakesService],
})
export class MakesModule {}
