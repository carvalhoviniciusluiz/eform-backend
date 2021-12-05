import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TAnswerEntity, IAnswer } from 'answers/domain';

@Injectable()
export class AnswerService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IAnswer[], number]> {
    console.log({ page, pagesize });

    return [[], 0];
  }

  async save(props: TAnswerEntity): Promise<void> {
    console.log(props);
  }

  async update(id: string, props: TAnswerEntity): Promise<void> {
    console.log(id, props);
  }
}
