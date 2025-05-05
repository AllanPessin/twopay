import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ email, password, name }: UserDTO): Promise<any> {
    const userExist = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      throw new ConflictException('E-mail já está sendo utilizado.');
    }

    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
      },
    });
  }

  findAll(): Promise<any> {
    return this.prisma.user.findMany();
  }
}
