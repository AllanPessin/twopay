import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async getTotalByCategory(categoryId: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const expenses = await this.prisma.expense.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
      },
    });

    const total = expenses.reduce((sum, expense) => sum + expense.value, 0);

    return {
      category,
      total,
      count: expenses.length,
      expenses,
    };
  }

  async getTotalExpenses() {
    const total = await this.prisma.expense.aggregate({
      _sum: {
        value: true,
      },
      _count: {
        id: true,
      },
    });

    return {
      total: total._sum.value ?? 0,
      count: total._count.id ?? 0,
    };
  }
}
