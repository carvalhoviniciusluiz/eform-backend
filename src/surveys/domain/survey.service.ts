import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSurveyCommand, GetAllSurveysQuery, UpdateSurveyCommand } from 'surveys/application';
import { AddSurveyChildCommand } from 'surveys/application/commands/add-survey-child';
import { ISurvey, ISurveyBody, ISurveyChildBody, ISurveyService } from 'surveys/domain';

@Injectable()
export class SurveyService implements ISurveyService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(formId: string, page: number, pagesize: number): Promise<[ISurvey[], number]> {
    const query = new GetAllSurveysQuery(formId, page, pagesize);
    return this.queryBus.execute<GetAllSurveysQuery, [ISurvey[], number]>(query);
  }

  async save(body: ISurveyChildBody): Promise<void> {
    const command = body.parentId ? new AddSurveyChildCommand(body) : new CreateSurveyCommand(body);
    return this.commandBus.execute(command);
  }

  async update(id: string, props: ISurveyBody): Promise<void> {
    const command = new UpdateSurveyCommand(id, props);
    return this.commandBus.execute(command);
  }
}
