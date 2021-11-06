import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository, IUser, TUserPropsWithoutPassword } from 'users/domain';
import { GetUsersCommand } from 'users/application/commands/queries/get-Users';
import { InjectionConstant } from 'users/injection.constant';

@CommandHandler(GetUsersCommand)
export class GetUsersHandler implements ICommandHandler<GetUsersCommand, [TUserPropsWithoutPassword[], number]> {
  constructor(
    @Inject(InjectionConstant.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: GetUsersCommand): Promise<[TUserPropsWithoutPassword[], number]> {
    const [rows, count] = await this.userRepository.find(command.page, command.pagesize);

    const parsedRows = rows.map(this.filterResultProps);

    return [parsedRows, count];
  }

  private filterResultProps(row: IUser) {
    const { id, firstname, lastname, documentNumber: number, email, phone, hasValidate, updatedAt } = row.props();

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
