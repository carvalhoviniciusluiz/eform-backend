import { ICommand } from '@nestjs/cqrs';
import { TUserEntity } from 'users/domain';

export class UpdateUserCommand implements ICommand {
  constructor(readonly id: string, readonly props: TUserEntity) {}
}
