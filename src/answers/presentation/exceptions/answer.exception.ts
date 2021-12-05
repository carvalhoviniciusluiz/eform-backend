import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class AnswerException extends NotFoundException {
  static canNotCreateAnswer(id: string): InternalServerErrorException {
    return new InternalServerErrorException(`The Answer with id "${id}" can not create Answer`);
  }

  static notFoundForId(id: string): AnswerException {
    return new NotFoundException(`The Answer with id "${id}" was not found`);
  }

  static unauthorizedForId(id: string): UnauthorizedException {
    return new UnauthorizedException(`The Answer with id "${id}" unauthorized`);
  }
}
