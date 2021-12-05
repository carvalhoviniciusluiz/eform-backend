import { TFormEntity, IForm } from 'forms/domain';

export interface IFormService {
  find: (page: number, pagesize: number) => Promise<[IForm[], number]>;
  save: (props: TFormEntity) => Promise<void>;
  update: (id: string, props: TFormEntity) => Promise<void>;
}
