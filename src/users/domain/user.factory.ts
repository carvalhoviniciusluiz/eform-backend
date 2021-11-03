import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IUser, UserImplement, UserProperties } from 'users/domain';

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(properties: UserProperties): IUser {
    return this.eventPublisher.mergeObjectContext(new UserImplement(properties));
  }

  reconstitute(properties: UserProperties): IUser {
    return this.eventPublisher.mergeObjectContext(new UserImplement(properties));
  }
}
