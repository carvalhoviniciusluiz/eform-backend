import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionCommand, GetAllQuestionsQuery, UpdateQuestionCommand } from 'questions/application';
import { IQuestionBody, IQuestion } from 'questions/domain';

@Injectable()
export class QuestionService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IQuestion[], number]> {
    const query = new GetAllQuestionsQuery(page, pagesize);
    return this.queryBus.execute<GetAllQuestionsQuery, [IQuestion[], number]>(query);
  }

  async save(body: IQuestionBody): Promise<void> {
    const command = new CreateQuestionCommand(body);
    return this.commandBus.execute(command);
  }

  async update(id: string, props: IQuestionBody): Promise<void> {
    const command = new UpdateQuestionCommand(id, props);
    return this.commandBus.execute(command);
  }
}
