import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 10,
    minNumbers: 6,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
