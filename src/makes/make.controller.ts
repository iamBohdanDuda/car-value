import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MakesService } from './makes.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AddMakeDto } from './dtos/add-make.dto';

@UseGuards(AuthGuard)
@Controller('makes')
export class MakeController {
  constructor(private makesService: MakesService) {}

  @Get()
  findAll() {
    return this.makesService.findAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  add(@Body() addMakeDto: AddMakeDto) {
    return this.makesService.add(addMakeDto);
  }
}
