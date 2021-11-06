import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'users/application/commands/mutations/create-user/create-user.command';
import { UpdateUserCommand } from 'users/application/commands/mutations/update-user/update-user.command';
import { GetUsersCommand } from 'users/application/commands/queries/get-users/get-users.command';
import { IUser, TUserProps, TUserPropsWithoutPassword } from 'users/domain';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus) {}

  async find(page: number, pagesize: number): Promise<[IUser[], number]> {
    const command = new GetUsersCommand(page, pagesize);
    return this.commandBus.execute<GetUsersCommand, [IUser[], number]>(command);
  }

  async save(props: TUserProps): Promise<void> {
    this.commandBus.execute(new CreateUserCommand(props));
  }

  async update(id: string, props: TUserPropsWithoutPassword): Promise<void> {
    this.commandBus.execute(new UpdateUserCommand(id, props));
  }
}
