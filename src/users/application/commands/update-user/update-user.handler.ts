import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory, UserRepository } from 'users/domain';
import { UpdateUserCommand } from 'users/application/commands/update-user';
import { InjectionToken } from 'users/application/commands/injection.token';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, void> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { aproperties } = command;

    const user = this.userFactory.reconstitute({
      firstname: aproperties.firstname,
      lastname: aproperties.lastname,
      documentNumber: aproperties.documentNumber,
      email: aproperties.email,
      phone: aproperties.phone,
      hasValidate: aproperties.hasValidate,
      closedAt: aproperties.closedAt,
      version: aproperties.version
    });

    await this.userRepository.update(aproperties.id, user);
  }
}
