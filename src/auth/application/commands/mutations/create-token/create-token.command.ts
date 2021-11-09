import { ICommand } from '@nestjs/cqrs';
import { JwtPayload } from 'auth/domain';

export class CreateTokenCommand implements ICommand {
  constructor(readonly payload: JwtPayload) {}
}
