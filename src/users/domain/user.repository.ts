import { IUser } from 'users/domain';

export interface IUserRepository {
  find: (page: number, pagesize: number) => Promise<[IUser[], number]>;
  save: (data: IUser | IUser[]) => Promise<void>;
  update: (id: string, data: IUser) => Promise<void>;
}
