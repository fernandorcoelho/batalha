import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDto } from 'src/auth/dtos/AuthUserDto.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto) {
    return authUserDto;
  }
}
