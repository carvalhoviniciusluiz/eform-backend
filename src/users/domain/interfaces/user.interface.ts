import { TUserEntity } from 'users/domain';

export interface IUser {
  props: () => TUserEntity;
  createAccount: (password: string) => void;
  closeAccount: (password: string) => void;
  updatePassword: (password: string, data: string) => void;
  validatePassword: (password: string) => Promise<boolean>;
}
