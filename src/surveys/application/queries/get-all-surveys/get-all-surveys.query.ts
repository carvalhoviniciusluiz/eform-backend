import { IQuery } from '@nestjs/cqrs';

export class GetAllSurveysQuery implements IQuery {
  constructor(readonly page: number, readonly pagesize: number) {}
}
