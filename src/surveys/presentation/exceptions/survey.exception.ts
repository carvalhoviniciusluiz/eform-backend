import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class SurveyException extends NotFoundException {
  static canNotCreateSurvey(id: string): InternalServerErrorException {
    return new InternalServerErrorException(`The Survey with id "${id}" can not create Survey`);
  }

  static notFoundForId(id: string): SurveyException {
    return new NotFoundException(`The Survey with id "${id}" was not found`);
  }

  static unauthorizedForId(id: string): UnauthorizedException {
    return new UnauthorizedException(`The Survey with id "${id}" unauthorized`);
  }
}
