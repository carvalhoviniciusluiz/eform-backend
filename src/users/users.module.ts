import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BullModule } from '@nestjs/bull';
import { CreateUserHandler, UpdateUserHandler } from 'users/application/commands';
import { AddSendEmailJobHandle } from 'users/application/events';
import { FindUsersHandler } from 'users/application/queries';
import { UserFactory, UserService } from 'users/domain';
import { SendConfirmationMailConsumer, UserRepository } from 'users/infra';
import { UsersController } from 'users/presentation';
import { queueConfig } from 'users/queueconfig';
import * as ENV from 'users/../constants';

const infrastructure = [
  {
    provide: ENV.USER_REPOSITORY,
    useClass: UserRepository
  },
  SendConfirmationMailConsumer
];
const application = [FindUsersHandler, CreateUserHandler, UpdateUserHandler, AddSendEmailJobHandle];
const domain = [
  UserFactory,
  {
    provide: ENV.USER_SERVICE,
    useClass: UserService
  }
];

@Module({
  imports: [CqrsModule, BullModule.registerQueue(queueConfig)],
  controllers: [UsersController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [BullModule]
})
export class UsersModule {}
