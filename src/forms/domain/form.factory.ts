import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IForm, FormModel, TFormEntity } from 'forms/domain';

export class FormFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(props: TFormEntity): IForm {
    return this.eventPublisher.mergeObjectContext(new FormModel(props));
  }

  reconstitute(props: TFormEntity): IForm {
    return this.eventPublisher.mergeObjectContext(new FormModel(props));
  }
}
