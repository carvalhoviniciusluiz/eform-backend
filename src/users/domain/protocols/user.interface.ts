import { TUserEntityProps } from 'users/domain/protocols';

export interface IUser {
  props: () => TUserEntityProps;
  createAccount: (password: string) => void;
  closeAccount: (password: string) => void;
  updatePassword: (password: string, data: string) => void;
  validatePassword: (password: string) => Promise<boolean>;
}
