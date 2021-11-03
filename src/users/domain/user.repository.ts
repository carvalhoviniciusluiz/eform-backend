import { IUser } from 'users/domain';

export interface IUserRepository {
  getAll: (page: number, pagesize: number) => Promise<[IUser[], number]>;
  save: (data: IUser | IUser[]) => Promise<void>;
  update: (id: string, data: IUser) => Promise<void>;
}
