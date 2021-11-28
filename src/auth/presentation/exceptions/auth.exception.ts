import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class AuthException extends UnauthorizedException {
  static unauthorized(description?: string): AuthException {
    return new UnauthorizedException(description);
  }

  static unauthorizedForCredential(credential: string): AuthException {
    return new UnauthorizedException(`The user with "${credential}" credential is not authorized`);
  }

  static emailAlreadyRegistered(email: string): AuthException {
    return new UnauthorizedException(`The email "${email}" is already registered`);
  }

  static documentNumberAlreadyRegistered(documentNumber: string): AuthException {
    return new UnauthorizedException(`The document number "${documentNumber}" is already registered`);
  }

  static strategyNotFound(grantType: string): NotFoundException {
    return new NotFoundException(`Cannot find the a strategy for the grant type "${grantType}"`);
  }
}
