import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReportService } from './report.service';

@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('totalByCategory')
  totalByCategory() {
    return this.reportService.getTotalByCategory();
  }

  @Get('totalByCategoryId/:categoryId')
  totalByCategoryid(@Param('categoryId') categoryId: number) {
    return this.reportService.getTotalByCategoryId(+categoryId);
  }

  @Get('totalExpenses')
  totalExpenses() {
    return this.reportService.getTotalExpenses();
  }
}
