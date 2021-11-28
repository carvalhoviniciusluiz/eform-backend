import { TUserEntity } from 'users/domain/types';
import { EmailTypeEnum } from 'users/domain/enums';

export type TEmailJob = Omit<
  TUserEntity,
  'id' | 'passwordHash' | 'salt' | 'updatedAt' | 'closedAt' | 'hasValidate' | 'version'
> & {
  emailType: EmailTypeEnum;
  password?: string;
};
