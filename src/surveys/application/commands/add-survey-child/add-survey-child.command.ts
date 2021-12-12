import { ICommand } from '@nestjs/cqrs';
import { ISurveyChildBody } from 'surveys/domain';

export class AddSurveyChildCommand implements ICommand {
  constructor(readonly props: ISurveyChildBody) {}
}
