import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthRegisterDTO {
  @ApiProperty({ example: 'jonh@email.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Jonh Doe', description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'strongpassword123!',
    description: 'User password',
    required: true,
  })
  @IsString()
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}
