import { ICommand } from '@nestjs/cqrs';
import { JwtPayload } from 'auth/domain';

export class SignInCommand implements ICommand {
  constructor(readonly payload: JwtPayload) {}
}
