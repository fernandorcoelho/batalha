import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
// import { Roles } from 'src/common/decorators/roles/roles.decorator';
// import { RoleEnum } from 'src/utils/role.enum';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Roles(RoleEnum.Admin, RoleEnum.Moderator) // Adicionar isso para dar permissões às rotas
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);

    return newUser;
  }

  // @Get()
  // @Roles(RoleEnum.Admin)
  // findAll() {
  //   // apenas usuários com role Admin podem acessar este endpoint
  // }
}
