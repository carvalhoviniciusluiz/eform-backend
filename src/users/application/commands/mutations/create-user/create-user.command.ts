import { ICommand } from '@nestjs/cqrs';
import { TUserProps } from 'users/domain';

export class CreateUserCommand implements ICommand {
  constructor(readonly props: TUserProps) {}
}
