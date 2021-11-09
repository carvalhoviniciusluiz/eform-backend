import { TUserEntity } from 'users/domain';

export type TUserWithoutPassword = Omit<TUserEntity, 'passwordHash'>;
