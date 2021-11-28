import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository, IUser, TUserWithoutPassword } from 'users/domain';
import { FindUsersQuery } from 'users/application/queries/find-Users';
import { USER_REPOSITORY } from 'users/../constants';

@QueryHandler(FindUsersQuery)
export class GetUsersHandler implements IQueryHandler<FindUsersQuery, [TUserWithoutPassword[], number]> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: FindUsersQuery): Promise<[TUserWithoutPassword[], number]> {
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
