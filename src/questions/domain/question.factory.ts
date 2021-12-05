import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IQuestion, QuestionModel, TQuestionEntity } from 'questions/domain';

export class QuestionFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(props: TQuestionEntity): IQuestion {
    return this.eventPublisher.mergeObjectContext(new QuestionModel(props));
  }

  reconstitute(props: TQuestionEntity): IQuestion {
    return this.eventPublisher.mergeObjectContext(new QuestionModel(props));
  }
}
