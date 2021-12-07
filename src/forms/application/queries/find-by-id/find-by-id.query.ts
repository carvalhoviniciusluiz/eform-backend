import { IQuery } from '@nestjs/cqrs';

export class FindByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
