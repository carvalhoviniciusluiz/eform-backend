import { IQuery } from '@nestjs/cqrs';

export class GetAllQuestionsQuery implements IQuery {
  constructor(readonly surveyId: string, readonly page: number, readonly pagesize: number) {}
}
