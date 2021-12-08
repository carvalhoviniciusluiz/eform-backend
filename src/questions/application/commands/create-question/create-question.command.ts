import { ICommand } from '@nestjs/cqrs';
import { IQuestionBody } from 'questions/domain';

export class CreateQuestionCommand implements ICommand {
  constructor(readonly props: IQuestionBody) {}
}
