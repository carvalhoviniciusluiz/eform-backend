import { ICommand } from '@nestjs/cqrs';

export class ValidatePasswordUserCommand implements ICommand {
  constructor(readonly credential: string, readonly password: string) {}
}
