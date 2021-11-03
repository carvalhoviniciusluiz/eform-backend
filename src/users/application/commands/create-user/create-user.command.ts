import { ICommand } from '@nestjs/cqrs';
import { UserProperties } from 'users/domain';

export class CreateUserCommand implements ICommand {
  constructor(readonly aproperties: UserProperties) {}
}
