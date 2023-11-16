import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
