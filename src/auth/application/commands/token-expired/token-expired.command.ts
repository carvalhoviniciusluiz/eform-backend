import { ICommand } from '@nestjs/cqrs';

export class TokenExpiredCommand implements ICommand {
  constructor(readonly token: string) {}
}
