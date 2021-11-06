import { ICommand } from '@nestjs/cqrs';
import { TUserEntityProps } from 'users/domain';

export class UpdateUserCommand implements ICommand {
  constructor(readonly id: string, readonly props: TUserEntityProps) {}
}
