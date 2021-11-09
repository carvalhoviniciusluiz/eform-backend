import 'reflect-metadata';
import { AUTH_GRANT_STRATEGY } from 'auth/../constants';

export const AuthGrantStrategy = (strategy: string): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(AUTH_GRANT_STRATEGY, strategy, target);
  };
};
