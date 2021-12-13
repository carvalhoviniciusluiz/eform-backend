import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as ENV from './constants';

let options: TypeOrmModuleOptions = {};

if (ENV.SSL === 'true') {
  options = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...options,
  type: 'postgres',
  host: ENV.POSTGRES_HOST,
  username: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.POSTGRES_DB,
  port: ENV.POSTGRES_PORT,
  entities: [`${__dirname}/**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/__migrations/*.{js,ts}`],
  synchronize: ENV.IS_DEV,
  logging: ENV.IS_DEV,
  cli: {
    migrationsDir: `${__dirname}/__migrations`
  }
};
