import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controllers/users/users.controller';
import { User } from './typeorm/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Role } from './typeorm/entities/role.entity';
import { UserRole } from './typeorm/entities/userRole.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'batalha_rap',
      synchronize: true, // setar para false em produção
      migrationsTableName: '_migrations',
      entities: [User, Role, UserRole],
      migrations: ['dist/migrations/**/*.{ts,js}'],
      migrationsRun: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
