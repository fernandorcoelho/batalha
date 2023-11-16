import { Role } from './role.enum';

export interface CreateUserParams {
  email: string;
  password: string;
  confirmPassword: string;
  role?: Role;
}
