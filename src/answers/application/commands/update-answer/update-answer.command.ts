import { ICommand } from '@nestjs/cqrs';
import { IAnswerBody } from 'answers/domain';

export class UpdateAnswerCommand implements ICommand {
  constructor(readonly id: string, readonly props: IAnswerBody) {}
}
