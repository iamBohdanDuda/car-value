import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ChangeApprovalDto } from './dtos/change-approval.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Serialize(ReportDto)
  @Post()
  create(
    @Body() createReportDto: CreateReportDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.reportsService.create(createReportDto, currentUser);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  changeApproval(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeApprovalDto: ChangeApprovalDto,
  ) {
    return this.reportsService.changeApproval(id, changeApprovalDto.approved);
  }

  @Get('estimate')
  getEstimate(@Query() getEstimateDto: GetEstimateDto) {
    return this.reportsService.getEstimate(getEstimateDto);
  }
}
