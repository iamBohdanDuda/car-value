import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { MakesService } from '../makes/makes.service';
import { ModelsService } from '../models/models.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>,
    private makesService: MakesService,
    private modelsService: ModelsService,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    currentUser: User,
  ): Promise<Report> {
    const report = this.repository.create(createReportDto);
    report.user = currentUser;

    report.make = await this.makesService.findOne(createReportDto.makeId);
    const model = await this.modelsService.findOne(createReportDto.modelId);
    if (model.makeId !== createReportDto.makeId)
      throw new NotFoundException('model not found for provided make');
    report.model = model;

    return this.repository.save(report);
  }

  async changeApproval(id: number, approved: boolean): Promise<Report> {
    const report = await this.repository.findOneBy({ id });
    report.approved = approved;
    return this.repository.save(report);
  }

  async getEstimate({
    makeId,
    modelId,
    year,
    lng,
    lat,
  }: GetEstimateDto): Promise<{ price: number }> {
    return this.repository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('makeId = :makeId', { makeId })
      .andWhere('modelId = :modelId', { modelId })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('lng - :lng BETWEEN -10 AND 10', { lng })
      .andWhere('lat - :lat BETWEEN -10 AND 10', { lat })
      .getRawOne();
  }
}
