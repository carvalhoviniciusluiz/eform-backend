import { TUserEntity } from 'users/domain';

export type TUser = Omit<TUserEntity, 'passwordHash'> & {
  password?: string;
};
