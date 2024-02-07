import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto.email, createUserDto.password);
  };

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  };

  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  };

  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id', ParseIntPipe) id: number) {
    return this.usersService.update(id, updateUserDto);
  };

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  };
}
