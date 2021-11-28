import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidatePasswordUserCommand } from 'users/application/commands/validate-password-user';
import { Inject } from '@nestjs/common';
import { IUser, IUserRepository } from 'users/domain';
import { USER_REPOSITORY } from 'users/../constants';

@CommandHandler(ValidatePasswordUserCommand)
export class ValidatePasswordUserHandler implements ICommandHandler<ValidatePasswordUserCommand, IUser | boolean> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: ValidatePasswordUserCommand): Promise<IUser | boolean> {
    const { credential, password } = command;

    const user = await this.userRepository.findByCredential(credential);

    if (!user) {
      return false;
    }

    const validated = await user.validatePassword(password);

    if (!validated) {
      return false;
    }

    return user;
  }
}
