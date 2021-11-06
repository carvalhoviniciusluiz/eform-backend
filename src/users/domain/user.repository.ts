import { IUser } from 'users/domain';

export interface IUserRepository {
  save: (data: IUser | IUser[]) => Promise<void>;
  update: (id: string, data: IUser) => Promise<void>;
  find: (page: number, pagesize: number) => Promise<[(null | IUser)[], number]>;
  findByCredential: (credential: string) => Promise<IUser | null>;
  findByEmail: (email: string) => Promise<IUser | null>;
}
