import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  id: string;
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 10,
    minNumbers: 6,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
