import { TFormEntity } from 'forms/domain';

export interface IForm {
  props: () => TFormEntity;
  createForm: () => void;
  publicForm: () => void;
}
