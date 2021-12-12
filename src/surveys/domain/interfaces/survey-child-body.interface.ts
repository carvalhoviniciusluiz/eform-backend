import { ISurveyBody } from 'surveys/domain';

export interface ISurveyChildBody extends ISurveyBody {
  parentId: string;
}
