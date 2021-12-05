import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ISurvey, SurveyModel, TSurveyEntity } from 'surveys/domain';

export class SurveyFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(props: TSurveyEntity): ISurvey {
    return this.eventPublisher.mergeObjectContext(new SurveyModel(props));
  }

  reconstitute(props: TSurveyEntity): ISurvey {
    return this.eventPublisher.mergeObjectContext(new SurveyModel(props));
  }
}
