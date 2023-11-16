import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(userDetails: CreateUserParams) {
    this.validatePasswordMatch(
      userDetails.password,
      userDetails.confirmPassword,
    );

    const newUser = this.userRepository.create(userDetails);

    return this.userRepository.save(newUser);
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
