import { GrantTypeEnum, TAuth } from 'auth/domain';

export interface IAuthService {
  run: (grantType: GrantTypeEnum, props: TAuth) => Promise<any>;
}
