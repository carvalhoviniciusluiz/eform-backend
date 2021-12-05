import { TQuestionEntity } from 'questions/domain';

export interface IQuestion {
  props: () => TQuestionEntity;
  createQuestion: () => void;
}
