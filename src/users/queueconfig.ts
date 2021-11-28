import { BullModuleOptions } from '@nestjs/bull';
import { SENDMAIL_USER_QUEUE } from 'users/constants';
import * as ENV from 'users/../constants';

const options: BullModuleOptions = {};

export const queueConfig: BullModuleOptions = {
  ...options,
  name: SENDMAIL_USER_QUEUE,
  redis: {
    host: ENV.REDIS_HOSTNAME,
    port: Number(ENV.REDIS_PORT),
    password: ENV.REDIS_PASSWORD
  }
};
