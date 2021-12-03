import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

const result = dotenv.config();

const ENV_FILE = result.parsed || {};

const configService = new ConfigService();

export const MAJOR = configService.get<string>('MAJOR') || 'dev';
export const VERSION = configService.get<string>('VERSION') || '1';

export const NODE_ENV = configService.get<string>('NODE_ENV');
export const APP_PORT = configService.get<number>('APP_PORT');

export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;

export const TABLE_PREFIX = configService.get<string>('TABLE_PREFIX');

// Dotenv
export const POSTGRES_DB = configService.get<string>('POSTGRES_DB');
export const POSTGRES_HOST = IS_TEST ? '0.0.0.0' : configService.get<string>('POSTGRES_HOST');
export const POSTGRES_PORT = configService.get<number>('POSTGRES_PORT');
export const POSTGRES_USER = configService.get<string>('POSTGRES_USER');
export const POSTGRES_PASSWORD = configService.get<string>('POSTGRES_PASSWORD');

export const MONGODB_URL = configService.get<string>('MONGODB_URL');

export const REDIS_HOSTNAME = configService.get<string>('REDIS_HOSTNAME');
export const REDIS_PORT = configService.get<number>('REDIS_PORT');
export const REDIS_PASSWORD = configService.get<string>('REDIS_PASSWORD');

export const MAIL_HOST = configService.get<string>('MAIL_HOST');
export const MAIL_PORT = configService.get<number>('MAIL_PORT');
export const MAIL_USER = configService.get<string>('MAIL_USER');
export const MAIL_PASS = configService.get<string>('MAIL_PASS');
export const MAIL_FROM = configService.get<string>('MAIL_FROM');

export const SSL = configService.get<string>('SSL') || 'false';

export const JWT_SECRET = configService.get<string>('JWT_SECRET') || 'jwt-secret';
export const JWT_SECRET_EXPIRES_IN = configService.get<string>('JWT_SECRET_EXPIRES_IN') || '5m';
export const JWT_SECRET_REFRESHTOKEN_EXPIRES_IN =
  configService.get<string>('JWT_SECRET_REFRESHTOKEN_EXPIRES_IN') || '7d';
export const JWT_SECRET_REFRESHTOKEN =
  configService.get<string>('JWT_SECRET_REFRESHTOKEN') || 'jwt-secret-refreshtoken';

// Injection constant
export const USER_REPOSITORY = 'IUserRepository';
export const USER_SERVICE = 'IUserService';
export const AUTH_SERVICE = 'IAuthService';
export const STRATEGY_REGISTER = 'IStrategyRegister';

// Decorators strategy
export const AUTH_GRANT_STRATEGY = '__authGrantStrategy__';

if (IS_DEV) {
  console.table(ENV_FILE);
}
