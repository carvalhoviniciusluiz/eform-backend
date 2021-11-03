import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler, CreateUserHandler, UpdateUserHandler } from './application/commands';
import { UserFactory } from 'users/domain';
import { UserRepositoryImplement } from 'users/infra';
import { UsersController } from 'users/presentation';

const infrastructure = [
  {
    provide: UserRepositoryImplement.name,
    useClass: UserRepositoryImplement
  }
];
const application = [GetUsersHandler, CreateUserHandler, UpdateUserHandler];
const domain = [UserFactory];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [Logger, ...infrastructure, ...application, ...domain]
})
export class UsersModule {}
