import { IQuery } from '@nestjs/cqrs';

export class GetAllAnswersQuery implements IQuery {
  constructor(readonly page: number, readonly pagesize: number) {}
}
