import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
// import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        description: createExpenseDto.description,
        value: createExpenseDto.value,
        date: createExpenseDto.date,
        observations: createExpenseDto.observations || '',
        recurrence: createExpenseDto.recurrence,
        paid: createExpenseDto.paid || false,
        userId: createExpenseDto.userId,
      },
    });
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  //   update(id: number, updateExpenseDto: UpdateExpenseDto) {
  //     return `This action updates a #${id} expense`;
  //   }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
