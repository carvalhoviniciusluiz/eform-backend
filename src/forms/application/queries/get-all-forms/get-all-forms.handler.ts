import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IFormRepository, IForm } from '@/forms/domain';
import { GetAllFormsQuery } from '@/forms/application/queries/get-all-forms';
import { FORM_REPOSITORY } from '@/constants';

type TAsset = {
  char: string;
  color: string;
  backgroundColor: string;
};

type ResultProps = {
  id: string;
  name: string;
  status: string;
  consumers: {
    avatars: TAsset[] | string[];
    total: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

@QueryHandler(GetAllFormsQuery)
export class GetAllFormsHandler implements IQueryHandler<GetAllFormsQuery, [ResultProps[], number]> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository
  ) {}

  async execute(command: GetAllFormsQuery): Promise<[ResultProps[], number]> {
    const [rows, count] = await this.formRepository.find(command.page, command.pagesize);
    const parsedRows = rows.map(this.filterResultProps);
    return [parsedRows, count];
  }

  private filterResultProps(row: IForm): ResultProps {
    const { id, name, status, consumers: users, createdAt, updatedAt } = row.props();
    const usersTotal = users.length;
    const consumers = users.splice(0, 5);

    const avatars = consumers.reduce((acc: any, cur: any) => {
      if (cur.avatar) {
        acc.push(cur.avatar);
      } else {
        const firstnameInitial = cur?.firstname?.charAt(0)?.toUpperCase() ?? '';
        const lastnameInitial = cur?.lastname?.charAt(0)?.toUpperCase() ?? '';

        acc.push({
          char: `${firstnameInitial}${lastnameInitial}`,
          color: '#4fc9da',
          backgroundColor: '#ddf8fc'
        });
      }
      return acc;
    }, []);

    return {
      id,
      name,
      status,
      consumers: {
        avatars,
        total: usersTotal
      },
      createdAt,
      updatedAt
    };
  }
}
