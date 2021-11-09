import { ICommand } from '@nestjs/cqrs';

export class TokenDecodedCommand implements ICommand {
  constructor(readonly token: string) {}
}
