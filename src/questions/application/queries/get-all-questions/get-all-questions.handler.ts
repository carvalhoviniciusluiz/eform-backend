import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IQuestionRepository, IQuestion, TQuestionEntity } from 'questions/domain';
import { GetAllQuestionsQuery } from 'questions/application/queries/get-all-questions';
import { QUESTION_REPOSITORY } from '../../../../constants';

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsQuery, [TQuestionEntity[], number]> {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: IQuestionRepository
  ) {}

  async execute(command: GetAllQuestionsQuery): Promise<[TQuestionEntity[], number]> {
    const [rows, count] = await this.questionRepository.find(command.page, command.pagesize);

    const parsedRows = rows.map(this.filterResultProps);

    return [parsedRows, count];
  }

  private filterResultProps(row: IQuestion) {
    const { id, surveyId, content, updatedAt } = row.props();

    return {
      id,
      surveyId,
      content,
      updatedAt
    };
  }
}
