import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (categoryExists) {
      throw new ConflictException(
        `Category ${categoryExists.name} already exists`,
      );
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: { expenses: true },
      }),
      this.prisma.category.count(),
    ]);

    return { data, total, page, limit, lastPage: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return new NotFoundException('Category not found');
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    const categoryWithExpenses = await this.prisma.category.findUnique({
      where: { id },
      include: { expenses: true },
    });
    if (categoryWithExpenses?.expenses.length > 0) {
      throw new ConflictException(
        `Category ${categoryWithExpenses} has expense and cannot be deleted`,
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
