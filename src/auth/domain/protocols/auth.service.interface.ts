import { SignInProps } from 'auth/domain';

export interface IAuthService {
  signIn: (credential: string, password: string) => Promise<SignInProps>;
}
