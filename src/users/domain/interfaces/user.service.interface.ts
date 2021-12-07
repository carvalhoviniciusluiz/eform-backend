import { IUser, TUser, TUserWithoutPassword } from 'users/domain';

export interface IUserService {
  find: (page: number, pagesize: number) => Promise<[IUser[], number]>;
  save: (props: TUser) => Promise<null | string>;
  update: (id: string, props: TUserWithoutPassword) => Promise<null | string>;
}
