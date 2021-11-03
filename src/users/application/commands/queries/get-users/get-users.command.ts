import { ICommand } from '@nestjs/cqrs';

export class GetUsersCommand implements ICommand {
  constructor(readonly page: number, readonly pagesize: number) {}
}
