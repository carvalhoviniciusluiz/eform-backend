import { CommandBus } from '@nestjs/cqrs';
import { IGrantStrategy } from 'common';
import { AuthGrantStrategy } from 'auth/presentation';
import { AuthException, TAuth, TCreateToken } from 'auth/domain';
import { CreateTokenCommand } from 'auth/application';
import { ValidatePasswordUserCommand } from 'users/application';
import { IUser } from 'users/domain';

@AuthGrantStrategy('password_grant')
export class PasswordGrantStrategy implements IGrantStrategy {
  constructor(private commandBus: CommandBus) {}

  private async throwExceptionOrReturnUser(credential: string, password: string): Promise<IUser> {
    const commandValidatePasswordUser = new ValidatePasswordUserCommand(credential, password);
    const user = await this.commandBus.execute(commandValidatePasswordUser);
    if (!user) {
      throw AuthException.unauthorized();
    }

    return user;
  }

  async run(data: TAuth): Promise<TCreateToken> {
    const { credential, password } = data;
    const user = await this.throwExceptionOrReturnUser(credential, password);

    const { email, firstname, lastname } = user.props();

    const createTokenCommand = new CreateTokenCommand({
      email,
      firstname,
      lastname,
      avatar: 'https://avatars.githubusercontent.com/u/22005684?v=4'
    });

    return this.commandBus.execute(createTokenCommand);
  }
}
