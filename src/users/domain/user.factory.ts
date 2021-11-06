import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IUser, UserModel, TUserEntityProps, TUserPropsWithoutPassword } from 'users/domain';

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(props: TUserPropsWithoutPassword): IUser {
    return this.eventPublisher.mergeObjectContext(new UserModel(props));
  }

  reconstitute(props: TUserEntityProps): IUser {
    return this.eventPublisher.mergeObjectContext(new UserModel(props));
  }
}
