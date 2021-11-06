import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidatePasswordUserCommand } from 'users/application/commands/mutations/validate-password-user';
import { InjectionConstant } from 'users/injection.constant';
import { Inject } from '@nestjs/common';
import { IUser, IUserRepository } from 'users/domain';

@CommandHandler(ValidatePasswordUserCommand)
export class ValidatePasswordUserHandler implements ICommandHandler<ValidatePasswordUserCommand, IUser | boolean> {
  constructor(
    @Inject(InjectionConstant.USER_REPOSITORY)
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
