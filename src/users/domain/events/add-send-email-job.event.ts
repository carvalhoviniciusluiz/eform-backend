import { IEvent } from '@nestjs/cqrs';
import { EmailTypeEnum } from 'users/domain/enums';
import { TEmailJob } from 'users/domain/types';

export class AddSendEmailJobEvent implements IEvent, TEmailJob {
  firstname?: string;
  documentNumber?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  emailType: EmailTypeEnum;
  password?: string;
}
