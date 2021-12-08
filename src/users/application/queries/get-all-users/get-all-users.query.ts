import { IQuery } from '@nestjs/cqrs';

export class GetAllUsersQuery implements IQuery {
  constructor(readonly page: number, readonly pagesize: number) {}
}
