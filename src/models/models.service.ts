import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './model.entity';
import { Repository } from 'typeorm';
import { AddModelDto } from './dtos/add-model.dto';
import { MakesService } from '../makes/makes.service';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model) private repository: Repository<Model>,
    private makesService: MakesService,
  ) {}

  async findOne(id: number): Promise<Model> {
    if (!id) throw new NotFoundException('model not found');
    const model = await this.repository.findOneBy({ id });
    if (!model) throw new NotFoundException('model not found');
    return model;
  }

  findAll(): Promise<Model[]> {
    return this.repository.find();
  }

  async add(addModelDto: AddModelDto): Promise<Model> {
    const model = this.repository.create(addModelDto);
    model.make = await this.makesService.findOne(addModelDto.makeId);
    return this.repository.save(model);
  }
}
