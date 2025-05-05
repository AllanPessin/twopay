import {
  //   BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(createExpenseDto: CreateExpenseDto, userId: number): Promise<any> {
    const { categoryId, ...expenseData } = createExpenseDto;

    const categoryExists = this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.expense.create({
      data: {
        ...expenseData,
        paid: expenseData.paid ?? false,
        user: {
          connect: { id: userId },
        },
        category: {
          connect: { id: categoryId },
        },
      },
    });
    //   .catch((error) => {
    //     throw new BadRequestException('Failed to create expense', error);
    //   })
    //   .finally(() => this.prisma.$disconnect());
  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  findOne(id: number) {
    return this.prisma.expense.findFirst({
      where: { id },
    });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  remove(id: number) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }

  async markAsPaid(id: number) {
    const expense = await this.prisma.expense.findFirst({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.paid) {
      throw new ConflictException('Expense is already paid');
    }

    return this.prisma.expense.update({
      where: { id },
      data: { paid: true },
    });
  }

  markAsUnpaid(id: number) {
    return this.prisma.expense.update({
      where: { id },
      data: { paid: false },
    });
  }
}
