import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAnswerCommand, GetAllAnswersQuery, UpdateAnswerCommand } from 'answers/application';
import { IAnswer } from 'answers/domain';
import { IAnswerBody } from './interfaces';

@Injectable()
export class AnswerService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IAnswer[], number]> {
    const query = new GetAllAnswersQuery(page, pagesize);
    return this.queryBus.execute<GetAllAnswersQuery, [IAnswer[], number]>(query);
  }

  async save(body: IAnswerBody): Promise<void> {
    const command = new CreateAnswerCommand(body);
    return this.commandBus.execute(command);
  }

  async update(id: string, props: IAnswerBody): Promise<void> {
    const command = new UpdateAnswerCommand(id, props);
    return this.commandBus.execute(command);
  }
}
