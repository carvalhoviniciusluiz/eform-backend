import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'users/application/commands/create-user/create-user.command';
import { UpdateUserCommand } from 'users/application/commands/update-user/update-user.command';
import { IUser, IUserService, TUser, TUserWithoutPassword } from 'users/domain';

@Injectable()
export class UserService implements IUserService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IUser[], number]> {
    return null;
  }

  async save(props: TUser): Promise<null | string> {
    const command = new CreateUserCommand(props);
    return this.commandBus.execute(command);
  }

  async update(id: string, props: TUserWithoutPassword): Promise<null | string> {
    const command = new UpdateUserCommand(id, props);
    return this.commandBus.execute(command);
  }
}
