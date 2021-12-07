import { ICommand } from '@nestjs/cqrs';
import { ISurveyBody } from 'surveys/domain';

export class CreateSurveyCommand implements ICommand {
  constructor(readonly props: ISurveyBody) {}
}
