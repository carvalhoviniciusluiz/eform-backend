import { MailerOptions } from '@nestjs-modules/mailer';
import * as ENV from './constants';

const options: MailerOptions = {};

export const mailerConfig: MailerOptions = {
  ...options,
  transport: {
    host: ENV.MAIL_HOST,
    port: Number(ENV.MAIL_PORT),
    auth: {
      user: ENV.MAIL_USER,
      pass: ENV.MAIL_PASS
    }
  },
  defaults: {
    from: ENV.MAIL_FROM
  }
};
