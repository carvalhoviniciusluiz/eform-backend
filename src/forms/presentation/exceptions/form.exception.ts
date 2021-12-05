import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class FormException extends NotFoundException {
  static canNotCreateForm(id: string): InternalServerErrorException {
    return new InternalServerErrorException(`The Form with id "${id}" can not create Form`);
  }

  static notFoundForId(id: string): FormException {
    return new NotFoundException(`The Form with id "${id}" was not found`);
  }

  static unauthorizedForId(id: string): UnauthorizedException {
    return new UnauthorizedException(`The Form with id "${id}" unauthorized`);
  }
}
