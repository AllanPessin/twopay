import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create() {}
  async findOne() {}
  //   async findOne(username: string): Promise<User | undefined> {
  //     return;
  //     this.users.find((user) => user.username == username);
  //   }
}
