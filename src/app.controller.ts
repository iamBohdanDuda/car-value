import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dtos/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
