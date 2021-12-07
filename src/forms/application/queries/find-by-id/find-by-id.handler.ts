import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IFormRepository, TFormEntity } from 'forms/domain';
import { FindByIdQuery } from 'forms/application/queries/find-by-id';
import { FORM_REPOSITORY } from '../../../../constants';

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery, null | TFormEntity> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository
  ) {}

  async execute(command: FindByIdQuery): Promise<null | TFormEntity> {
    const row = await this.formRepository.findById(command.id);

    if (!row) {
      throw {
        idExists: false,
        formId: command.id
      };
    }

    const { id, name, updatedAt } = row.props();

    return {
      id,
      name,
      updatedAt
    };
  }
}
