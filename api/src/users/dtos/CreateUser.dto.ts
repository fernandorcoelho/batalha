import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { RoleEnum } from 'src/utils/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase letter, and one lowercase letter',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsEnum(RoleEnum, { message: 'Invalid role' })
  role: RoleEnum;
}
