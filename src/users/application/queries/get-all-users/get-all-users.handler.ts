import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository, IUser, TUserWithoutPassword } from 'users/domain';
import { GetAllUsersQuery } from 'users/application/queries/get-all-Users';
import { USER_REPOSITORY } from '../../../../constants';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery, [TUserWithoutPassword[], number]> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: GetAllUsersQuery): Promise<[TUserWithoutPassword[], number]> {
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
