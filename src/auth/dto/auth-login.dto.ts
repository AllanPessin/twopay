import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  //   @ApiProperty({
  //     example: '1',
  //     description: 'User ID',
  //   })
  id: number;

  @ApiProperty({ example: 'jonh@email.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongpassword123!',
    description: 'User password',
    required: true,
  })
  @IsString()
  @IsStrongPassword({
    minLength: 10,
    minNumbers: 6,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
