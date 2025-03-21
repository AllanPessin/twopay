import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorreto');
    }

    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('E-mail ou senha incorreto');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return user as User;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async regsiter({ email, password, name }: AuthRegisterDto): Promise<any> {
    const userExist = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      throw new ConflictException('E-mail já está sendo utilizado.');
    }

    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

    const user = await this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
      },
    });

    return this.login(user);
  }
}
