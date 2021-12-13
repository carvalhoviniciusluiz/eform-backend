import { IQuestion } from 'questions/domain';

export interface IQuestionRepository {
  save: (data: IQuestion | IQuestion[]) => Promise<null | Date>;
  update: (id: string, data: IQuestion) => Promise<null | Date>;
  find: (surveyId: string, page: number, pagesize: number) => Promise<[(null | IQuestion)[], number]>;
  findByContent: (surveyId: string, content: string) => Promise<null | IQuestion>;
  findById: (id: string) => Promise<null | IQuestion>;
}
