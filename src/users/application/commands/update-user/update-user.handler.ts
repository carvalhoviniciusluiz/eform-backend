import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory, IUserRepository } from 'users/domain';
import { UpdateUserCommand } from 'users/application/commands/update-user';
import { USER_REPOSITORY } from '../../../../constants';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, void> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly userFactory: UserFactory
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id, props } = command;

    const data = this.userFactory.reconstitute({
      firstname: props.firstname,
      lastname: props.lastname,
      documentNumber: props.documentNumber,
      email: props.email,
      phone: props.phone,
      hasValidate: props.hasValidate,
      closedAt: props.closedAt,
      version: props.version
    });

    await this.userRepository.update(id, data);
  }
}
