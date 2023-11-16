import { RoleEnum } from './role.enum';

export interface CreateUserParams {
  email: string;
  password: string;
  confirmPassword: string;
}
