import { IUser, TUserProps, TUserPropsWithoutPassword } from 'users/domain';

export interface IUserService {
  find: (page: number, pagesize: number) => Promise<[IUser[], number]>;
  save: (props: TUserProps) => Promise<void>;
  update: (id: string, props: TUserPropsWithoutPassword) => Promise<void>;
}
