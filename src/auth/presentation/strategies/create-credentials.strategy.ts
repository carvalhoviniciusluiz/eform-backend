import { CommandBus } from '@nestjs/cqrs';
import { IGrantStrategy } from 'common';
import { AuthGrantStrategy } from 'auth/presentation';
import { CreateUserCommand } from 'users/application';

type TRequest = {
  documentNumber: string;
  password: string;
};

@AuthGrantStrategy('create_credentials')
export class CreateCredentialsStrategy implements IGrantStrategy {
  constructor(private commandBus: CommandBus) {}

  private throwExceptionIfInvalid(body: TRequest) {
    const { documentNumber, password } = body;
    const isValid = !!documentNumber && !!password;

    if (!isValid) {
      throw { unauthorized: true };
    }
  }

  async run(body: TRequest): Promise<void> {
    this.throwExceptionIfInvalid(body);

    const createUserCommand = new CreateUserCommand(body);
    this.commandBus.execute(createUserCommand);
  }
}
