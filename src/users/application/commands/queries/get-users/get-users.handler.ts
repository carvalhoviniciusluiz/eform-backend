import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository, IUser } from 'users/domain';
import { GetUsersCommand } from 'users/application/commands/queries/get-Users';
import { InjectionToken } from 'users/application/commands/injection.token';

@CommandHandler(GetUsersCommand)
export class GetUsersHandler implements ICommandHandler<GetUsersCommand, [IUser[], number]> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  execute(command: GetUsersCommand): Promise<[IUser[], number]> {
    return this.userRepository.getAll(command.page, command.pagesize);
  }
}
