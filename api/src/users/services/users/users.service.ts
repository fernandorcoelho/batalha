import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/typeorm/entities/role.entity';
import { RoleEnum } from 'src/utils/role.enum';
import { UserRole } from 'src/typeorm/entities/userRole.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userDetails: CreateUserParams) {
    this.validatePasswordMatch(
      userDetails.password,
      userDetails.confirmPassword,
    );

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const newUser = this.userRepository.create({
      ...userDetails,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    const defaultRole = await this.roleRepository.findOne({
      where: { name: RoleEnum.Crowd },
    });
    if (defaultRole) {
      const userRole = this.userRoleRepository.create({
        user: savedUser,
        role: defaultRole,
      });
      await this.userRoleRepository.save(userRole);
    }

    return savedUser;
  }

  private validatePasswordMatch(
    password: string,
    confirmPassword: string,
  ): void {
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
  }
}
