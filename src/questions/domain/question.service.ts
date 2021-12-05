import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TQuestionEntity, IQuestion } from 'questions/domain';

@Injectable()
export class QuestionService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IQuestion[], number]> {
    console.log({ page, pagesize });

    return [[], 0];
  }

  async save(props: TQuestionEntity): Promise<void> {
    console.log(props);
  }

  async update(id: string, props: TQuestionEntity): Promise<void> {
    console.log(id, props);
  }
}
