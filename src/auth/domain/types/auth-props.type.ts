import { TUser } from 'users/domain';

export type TAuth = TUser & {
  credential?: string;
};
