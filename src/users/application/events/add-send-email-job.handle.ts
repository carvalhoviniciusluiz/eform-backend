import { InjectQueue } from '@nestjs/bull';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Queue } from 'bull';
import { SENDMAIL_CONFIRMATION_JOB, SENDMAIL_USER_QUEUE } from 'users/constants';
import { AddSendEmailJobEvent, EmailTypeEnum } from 'users/domain';

@EventsHandler(AddSendEmailJobEvent)
export class AddSendEmailJobHandle implements IEventHandler<AddSendEmailJobEvent> {
  constructor(@InjectQueue(SENDMAIL_USER_QUEUE) private queue: Queue) {}

  handle(event: AddSendEmailJobEvent) {
    const { emailType } = event;

    switch (emailType) {
      case EmailTypeEnum.CONFIRMATION:
        this.queue.add(SENDMAIL_CONFIRMATION_JOB, event);
        break;
      default:
        return;
    }
  }
}
