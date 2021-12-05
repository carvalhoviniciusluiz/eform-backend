import { TSurveyEntity } from 'surveys/domain';

export interface ISurvey {
  props: () => TSurveyEntity;
  createForm: () => void;
}
