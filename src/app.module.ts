import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';
import { ReportService } from './report/report.service';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ExpenseModule,
    CategoryModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ReportService],
})
export class AppModule {}
