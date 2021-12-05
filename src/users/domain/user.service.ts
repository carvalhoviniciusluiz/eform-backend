import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'users/application/commands/create-user/create-user.command';
import { UpdateUserCommand } from 'users/application/commands/update-user/update-user.command';
import { FindUsersQuery } from 'users/application/queries/find-users/find-users.query';
import { IUser, TUser, TUserWithoutPassword } from 'users/domain';

@Injectable()
export class UserService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IUser[], number]> {
    const query = new FindUsersQuery(page, pagesize);
    return this.queryBus.execute<FindUsersQuery, [IUser[], number]>(query);
  }

  async save(props: TUser): Promise<void> {
    const command = new CreateUserCommand(props);
    this.commandBus.execute(command);
  }

  async update(id: string, props: TUserWithoutPassword): Promise<void> {
    const command = new UpdateUserCommand(id, props);
    this.commandBus.execute(command);
  }
}
