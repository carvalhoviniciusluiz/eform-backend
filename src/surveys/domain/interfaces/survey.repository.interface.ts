import { ISurvey } from 'surveys/domain';

export interface ISurveyRepository {
  save: (data: ISurvey | ISurvey[]) => Promise<null | Date>;
  update: (id: string, data: ISurvey) => Promise<null | Date>;
  find: (formId: string, page: number, pagesize: number) => Promise<[(null | ISurvey)[], number]>;
  findById: (id: string) => Promise<null | ISurvey>;
  findByName: (name: string) => Promise<null | ISurvey>;
}
