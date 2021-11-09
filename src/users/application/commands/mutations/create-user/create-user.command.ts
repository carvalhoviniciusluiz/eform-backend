import { ICommand } from '@nestjs/cqrs';
import { TUser } from 'users/domain';

export class CreateUserCommand implements ICommand {
  constructor(readonly props: TUser) {}
}
