import { TFormEntity } from 'forms/domain';

export type TSurveyEntity = {
  readonly id?: string;
  readonly formId?: string;
  readonly form?: TFormEntity;
  readonly parentId?: string;
  readonly children?: TSurveyEntity[];
  readonly name?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly version?: number;
};
