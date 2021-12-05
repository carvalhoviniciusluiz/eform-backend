import { IAnswer } from 'answers/domain';

export interface IAnswerRepository {
  save: (data: IAnswer | IAnswer[]) => Promise<null | Date>;
  update: (id: string, data: IAnswer) => Promise<null | Date>;
  find: (page: number, pagesize: number) => Promise<[(null | IAnswer)[], number]>;
}
