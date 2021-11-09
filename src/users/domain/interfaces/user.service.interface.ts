import { IUser, TUser, TUserWithoutPassword } from 'users/domain';

export interface IUserService {
  find: (page: number, pagesize: number) => Promise<[IUser[], number]>;
  save: (props: TUser) => Promise<void>;
  update: (id: string, props: TUserWithoutPassword) => Promise<void>;
}
