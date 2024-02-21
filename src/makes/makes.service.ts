import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Make } from './make.entity';
import { Repository } from 'typeorm';
import { AddMakeDto } from './dtos/add-make.dto';

@Injectable()
export class MakesService {
  constructor(@InjectRepository(Make) private repository: Repository<Make>) {}

  async findOne(id: number): Promise<Make> {
    if (!id) throw new NotFoundException('make not found');
    const make = await this.repository.findOneBy({ id });
    if (!make) throw new NotFoundException('make not found');
    return make;
  }

  findAll(): Promise<Make[]> {
    return this.repository.find();
  }

  add(addMakeDto: AddMakeDto): Promise<Make> {
    const make = this.repository.create(addMakeDto);
    return this.repository.save(make);
  }
}
