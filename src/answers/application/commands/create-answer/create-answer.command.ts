import { ICommand } from '@nestjs/cqrs';
import { IAnswerBody } from 'answers/domain';

export class CreateAnswerCommand implements ICommand {
  constructor(readonly props: IAnswerBody) {}
}
