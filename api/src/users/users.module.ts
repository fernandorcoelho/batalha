import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Role } from 'src/typeorm/entities/role.entity';
import { UserRole } from 'src/typeorm/entities/UserRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
