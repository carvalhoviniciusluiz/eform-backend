import { TQuestionEntity, IQuestion } from 'questions/domain';

export interface IQuestionService {
  find: (page: number, pagesize: number) => Promise<[IQuestion[], number]>;
  save: (props: TQuestionEntity) => Promise<void>;
  update: (id: string, props: TQuestionEntity) => Promise<void>;
}
