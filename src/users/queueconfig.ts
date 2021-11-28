import { BullModuleOptions } from '@nestjs/bull';
import * as ENV from 'users/../constants';

const options: BullModuleOptions = {};

export const queueConfig: BullModuleOptions = {
  ...options,
  name: 'sendMail-user-queue',
  redis: {
    host: ENV.REDIS_HOSTNAME,
    port: Number(ENV.REDIS_PORT),
    password: ENV.REDIS_PASSWORD
  }
};
