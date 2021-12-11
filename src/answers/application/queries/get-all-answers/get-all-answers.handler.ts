import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IAnswerRepository, IAnswer, TAnswerEntity } from 'answers/domain';
import { GetAllAnswersQuery } from 'answers/application/queries/get-all-answers';
import { ANSWER_REPOSITORY } from '../../../../constants';

@QueryHandler(GetAllAnswersQuery)
export class GetAllAnswersHandler implements IQueryHandler<GetAllAnswersQuery, [TAnswerEntity[], number]> {
  constructor(
    @Inject(ANSWER_REPOSITORY)
    private readonly answerRepository: IAnswerRepository
  ) {}

  async execute(command: GetAllAnswersQuery): Promise<[TAnswerEntity[], number]> {
    const [rows, count] = await this.answerRepository.find(command.page, command.pagesize);

    const parsedRows = rows.map(this.filterResultProps);

    return [parsedRows, count];
  }

  private filterResultProps(row: IAnswer) {
    const { id, questionId, content, updatedAt } = row.props();

    return {
      id,
      questionId,
      content,
      updatedAt
    };
  }
}
