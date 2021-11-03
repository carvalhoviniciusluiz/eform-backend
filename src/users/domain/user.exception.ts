import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class UserException extends NotFoundException {
  static canNotOpenUser(id: string): InternalServerErrorException {
    return new InternalServerErrorException(`The user with id "${id}" can not open user`);
  }

  static notFoundForId(id: string): UserException {
    return new NotFoundException(`The user with id "${id}" was not found`);
  }

  static unauthorizedForId(id: string): UnauthorizedException {
    return new NotFoundException(`The user with id "${id}" unauthorized`);
  }
}
