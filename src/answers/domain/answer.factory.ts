import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IAnswer, AnswerModel, TAnswerEntity } from 'answers/domain';

export class AnswerFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(props: TAnswerEntity): IAnswer {
    return this.eventPublisher.mergeObjectContext(new AnswerModel(props));
  }

  reconstitute(props: TAnswerEntity): IAnswer {
    return this.eventPublisher.mergeObjectContext(new AnswerModel(props));
  }
}
