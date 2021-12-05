import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class QuestionException extends NotFoundException {
  static canNotCreateQuestion(id: string): InternalServerErrorException {
    return new InternalServerErrorException(`The Question with id "${id}" can not create Question`);
  }

  static notFoundForId(id: string): QuestionException {
    return new NotFoundException(`The Question with id "${id}" was not found`);
  }

  static unauthorizedForId(id: string): UnauthorizedException {
    return new UnauthorizedException(`The Question with id "${id}" unauthorized`);
  }
}
