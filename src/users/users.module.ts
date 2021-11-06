import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler, CreateUserHandler, UpdateUserHandler } from 'users/application/commands';
import { UserFactory, UserService } from 'users/domain';
import { UserRepository } from 'users/infra';
import { UsersController } from 'users/presentation';

const infrastructure = [
  {
    provide: UserRepository.name,
    useClass: UserRepository
  }
];
const application = [GetUsersHandler, CreateUserHandler, UpdateUserHandler];
const domain = [UserFactory, UserService];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [Logger, ...infrastructure, ...application, ...domain]
})
export class UsersModule {}
