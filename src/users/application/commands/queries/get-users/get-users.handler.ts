import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository, IUser, UserProperties } from 'users/domain';
import { GetUsersCommand } from 'users/application/commands/queries/get-Users';
import { InjectionToken } from 'users/application/commands/injection.token';

@CommandHandler(GetUsersCommand)
export class GetUsersHandler implements ICommandHandler<GetUsersCommand, [UserProperties[], number]> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: GetUsersCommand): Promise<[UserProperties[], number]> {
    const [rows, count] = await this.userRepository.find(command.page, command.pagesize);

    const parsedRows = rows.map(this.filterResultProperties);

    return [parsedRows, count];
  }

  private filterResultProperties(row: IUser) {
    const { id, firstname, lastname, documentNumber: number, email, phone, hasValidate, updatedAt } = row.properties();

    return {
      id,
      firstname,
      lastname,
      document: {
        number
      },
      email,
      phone,
      hasValidate,
      updatedAt
    };
  }
}
