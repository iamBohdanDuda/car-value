import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    currentUser: User,
  ): Promise<Report> {
    const report = this.repository.create(createReportDto);
    report.user = currentUser;
    return this.repository.save(report);
  }

  async changeApproval(id: number, approved: boolean): Promise<Report> {
    const report = await this.repository.findOneBy({ id });
    report.approved = approved;
    return this.repository.save(report);
  }
}
