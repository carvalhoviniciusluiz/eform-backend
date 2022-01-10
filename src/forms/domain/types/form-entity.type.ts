import { FormStatusEnum } from 'forms/infra';

export type TFormEntity = {
  readonly id?: string;
  readonly name?: string;
  readonly status?: FormStatusEnum;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly version?: number;
};
