import { TUserEntityProps } from 'users/domain';

export type TUserPropsWithoutPassword = Omit<TUserEntityProps, 'passwordHash'>;
