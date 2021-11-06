import { UnauthorizedException } from '@nestjs/common';

export class AuthException extends UnauthorizedException {
  static unauthorized(): AuthException {
    return new UnauthorizedException();
  }

  static unauthorizedForCredential(credential: string): AuthException {
    return new UnauthorizedException(`The user with "${credential}" credential is not authorized`);
  }
}
