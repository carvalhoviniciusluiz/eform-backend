import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from 'auth/application/commands/mutations/sign-in';
import { ValidatePasswordUserCommand } from 'users/application';
import { AuthException } from 'auth/domain';
import { IUser } from 'users/domain';
import { SignInProps } from 'auth/domain';

@Injectable()
export class AuthService {
  constructor(private commandBus: CommandBus) {}

  async signIn(credential: string, password: string): Promise<SignInProps> {
    const commandValidatePasswordUser = new ValidatePasswordUserCommand(credential, password);
    const user = await this.commandBus.execute<ValidatePasswordUserCommand, IUser>(commandValidatePasswordUser);

    if (!user) {
      throw AuthException.unauthorizedForCredential(credential);
    }

    const { email, firstname, lastname } = user.props();

    const commandSignIn = new SignInCommand({
      email,
      firstname,
      lastname,
      avatar: 'https://avatars.githubusercontent.com/u/22005684?v=4'
    });

    const result = await this.commandBus.execute<SignInCommand, SignInProps>(commandSignIn);
    return result;
  }
}
