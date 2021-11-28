import { IUser } from 'users/domain';

export interface IUserRepository {
  save: (data: IUser | IUser[]) => Promise<null | Date>;
  update: (id: string, data: IUser) => Promise<null | Date>;
  find: (page: number, pagesize: number) => Promise<[(null | IUser)[], number]>;
  findByDocumentNumber: (documentNumber: string) => Promise<null | IUser>;
  findByCredential: (credential: string) => Promise<IUser | null>;
  findByEmail: (email: string) => Promise<IUser | null>;
}
