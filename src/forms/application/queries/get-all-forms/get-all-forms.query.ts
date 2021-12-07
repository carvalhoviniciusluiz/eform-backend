import { IQuery } from '@nestjs/cqrs';

export class GetAllFormsQuery implements IQuery {
  constructor(readonly page: number, readonly pagesize: number) {}
}
