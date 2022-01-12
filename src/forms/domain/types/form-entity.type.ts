import { FormStatusEnum } from 'forms/infra';
import { UserEntity } from 'users/infra';

export type TFormEntity = {
  readonly id?: string;
  readonly name?: string;
  readonly consumers?: UserEntity[];
  readonly status?: FormStatusEnum;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly version?: number;
};
