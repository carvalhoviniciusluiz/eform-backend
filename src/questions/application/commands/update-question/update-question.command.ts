import { ICommand } from '@nestjs/cqrs';
import { IQuestionBody } from 'questions/domain';

export class UpdateQuestionCommand implements ICommand {
  constructor(readonly id: string, readonly props: IQuestionBody) {}
}
