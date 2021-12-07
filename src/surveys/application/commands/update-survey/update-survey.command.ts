import { ICommand } from '@nestjs/cqrs';
import { ISurveyBody } from 'surveys/domain';

export class UpdateSurveyCommand implements ICommand {
  constructor(readonly id: string, readonly props: ISurveyBody) {}
}
