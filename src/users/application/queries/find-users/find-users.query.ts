import { IQuery } from '@nestjs/cqrs';

export class FindUsersQuery implements IQuery {
  constructor(readonly page: number, readonly pagesize: number) {}
}
