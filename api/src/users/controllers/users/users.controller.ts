import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
// import { Roles } from 'src/common/decorators/roles/roles.decorator';
// import { Role } from 'src/utils/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Roles(Role.Admin, Role.Moderator) // Adicionar isso para dar permissões às rotas
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);

    return newUser;
  }
}
