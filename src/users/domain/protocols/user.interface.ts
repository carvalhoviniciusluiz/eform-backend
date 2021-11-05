import { UserProperties } from 'users/domain/protocols';

export interface IUser {
  properties: () => UserProperties;
  open: (password: string) => void;
  updatePassword: (password: string, data: string) => void;
  close: (password: string) => void;
}
