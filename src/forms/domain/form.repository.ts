import { IForm } from 'forms/domain';

export interface IFormRepository {
  save: (data: IForm | IForm[]) => Promise<null | Date>;
  update: (id: string, data: IForm) => Promise<null | Date>;
  find: (page: number, pagesize: number) => Promise<[(null | IForm)[], number]>;
}
