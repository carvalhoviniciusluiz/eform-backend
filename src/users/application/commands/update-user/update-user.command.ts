import { ICommand } from '@nestjs/cqrs';
import { UserProperties } from 'users/domain';

export class UpdateUserCommand implements ICommand {
  constructor(id: string, readonly aproperties: UserProperties) {}
}
