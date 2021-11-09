import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IUser, UserModel, TUserEntity, TUserWithoutPassword } from 'users/domain';

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(props: TUserWithoutPassword): IUser {
    return this.eventPublisher.mergeObjectContext(new UserModel(props));
  }

  reconstitute(props: TUserEntity): IUser {
    return this.eventPublisher.mergeObjectContext(new UserModel(props));
  }
}
