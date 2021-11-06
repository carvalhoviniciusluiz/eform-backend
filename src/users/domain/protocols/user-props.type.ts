import { TUserEntityProps } from 'users/domain';

export type TUserProps = Omit<TUserEntityProps, 'passwordHash'> & {
  password?: string;
};
