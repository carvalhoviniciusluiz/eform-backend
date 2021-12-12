import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ISurveyRepository, ISurvey, TSurveyEntity } from 'surveys/domain';
import { GetAllSurveysQuery } from 'surveys/application/queries/get-all-surveys';
import { SURVEY_REPOSITORY } from '../../../../constants';

@QueryHandler(GetAllSurveysQuery)
export class GetAllSurveysHandler implements IQueryHandler<GetAllSurveysQuery, [TSurveyEntity[], number]> {
  constructor(
    @Inject(SURVEY_REPOSITORY)
    private readonly surveyRepository: ISurveyRepository
  ) {}

  async execute(command: GetAllSurveysQuery): Promise<[TSurveyEntity[], number]> {
    const [rows, count] = await this.surveyRepository.find(command.formId, command.page, command.pagesize);

    const parsedRows = rows.map(this.filterResultProps);

    return [parsedRows, count];
  }

  private filterResultProps(row: ISurvey) {
    const { id, name, children, updatedAt } = row.props();

    return {
      id,
      name,
      children: children?.map(child => ({
        id: child.id,
        name: child.name,
        updatedAt: child.updatedAt
      })),
      updatedAt
    };
  }
}
