import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IFormRepository, IForm, TFormEntity } from 'forms/domain';
import { GetAllFormsQuery } from 'forms/application/queries/get-all-forms';
import { FORM_REPOSITORY } from '../../../../constants';

@QueryHandler(GetAllFormsQuery)
export class GetAllFormsHandler implements IQueryHandler<GetAllFormsQuery, [TFormEntity[], number]> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository
  ) {}

  async execute(command: GetAllFormsQuery): Promise<[TFormEntity[], number]> {
    const [rows, count] = await this.formRepository.find(command.page, command.pagesize);

    const parsedRows = rows.map(this.filterResultProps);

    return [parsedRows, count];
  }

  private filterResultProps(row: IForm) {
    const { id, name, status, createdAt, updatedAt } = row.props();

    return {
      id,
      name,
      status,
      createdAt,
      updatedAt
    };
  }
}
