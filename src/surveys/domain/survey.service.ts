import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSurveyCommand, GetAllSurveysQuery, UpdateSurveyCommand } from 'surveys/application';
import { ISurvey, ISurveyBody } from 'surveys/domain';

@Injectable()
export class SurveyService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[ISurvey[], number]> {
    const query = new GetAllSurveysQuery(page, pagesize);
    return this.queryBus.execute<GetAllSurveysQuery, [ISurvey[], number]>(query);
  }

  async save(body: ISurveyBody): Promise<void> {
    const command = new CreateSurveyCommand(body);
    return this.commandBus.execute(command);
  }

  async update(id: string, props: ISurveyBody): Promise<void> {
    const command = new UpdateSurveyCommand(id, props);
    return this.commandBus.execute(command);
  }
}
