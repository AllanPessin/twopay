import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  imports: [PrismaModule],
  providers: [ReportService],
})
export class ReportModule {}
