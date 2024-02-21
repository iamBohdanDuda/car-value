import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AddModelDto } from './dtos/add-model.dto';
import { ModelsService } from './models.service';

@UseGuards(AuthGuard)
@Controller('models')
export class ModelsController {
  constructor(private modelsService: ModelsService) {}

  @Get()
  findAll() {
    return this.modelsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  add(@Body() addModelDto: AddModelDto) {
    return this.modelsService.add(addModelDto);
  }
}
