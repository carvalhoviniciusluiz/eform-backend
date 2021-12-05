import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TSurveyEntity, ISurvey } from 'surveys/domain';

@Injectable()
export class SurveyService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[ISurvey[], number]> {
    console.log({ page, pagesize });

    return [[], 0];
  }

  async save(props: TSurveyEntity): Promise<void> {
    console.log(props);
  }

  async update(id: string, props: TSurveyEntity): Promise<void> {
    console.log(props);
  }
}
