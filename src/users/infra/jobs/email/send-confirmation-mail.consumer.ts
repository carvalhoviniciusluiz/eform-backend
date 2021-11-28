import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SENDMAIL_CONFIRMATION_JOB, SENDMAIL_USER_QUEUE } from 'users/constants';
import { TEmailJob } from 'users/domain/types';

@Processor(SENDMAIL_USER_QUEUE)
export class SendConfirmationMailConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process(SENDMAIL_CONFIRMATION_JOB)
  async sendMailJob(job: Job<TEmailJob>) {
    const { data } = job;
    await this.mailerService.sendMail({
      to: data.email,
      from: process.env.MAIL_FROM,
      subject: process.env.MAIL_SUBJECT,
      text: `Hi ${data.firstname} your registration was successful.`
    });
  }
}
