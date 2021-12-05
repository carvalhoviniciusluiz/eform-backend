import { TSurveyEntity, ISurvey } from 'surveys/domain';

export interface ISurveyService {
  find: (page: number, pagesize: number) => Promise<[ISurvey[], number]>;
  save: (props: TSurveyEntity) => Promise<void>;
  update: (id: string, props: TSurveyEntity) => Promise<void>;
}
