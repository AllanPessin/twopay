import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Login successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiOperation({ summary: 'Connect user' })
  @ApiBody({
    description: 'Login user with credentials',
    type: AuthLoginDTO,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() authLoginDTO: AuthLoginDTO) {
    return this.authService.login(authLoginDTO);
  }

  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  async register(@Body() authRegisterDTO: AuthRegisterDTO) {
    return this.authService.register(authRegisterDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiBody({
    description: 'JWT Token',
    type: String,
  })
  @ApiOperation({ summary: 'Retrieve user profile' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
