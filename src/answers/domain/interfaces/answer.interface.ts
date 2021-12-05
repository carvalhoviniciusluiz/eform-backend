import { TAnswerEntity } from 'answers/domain';

export interface IAnswer {
  props: () => TAnswerEntity;
  createAnswer: () => void;
}
