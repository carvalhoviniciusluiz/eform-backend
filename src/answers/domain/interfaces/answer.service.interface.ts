import { TAnswerEntity, IAnswer } from 'answers/domain';

export interface IAnswerService {
  find: (page: number, pagesize: number) => Promise<[IAnswer[], number]>;
  save: (props: TAnswerEntity) => Promise<void>;
  update: (id: string, props: TAnswerEntity) => Promise<void>;
}
