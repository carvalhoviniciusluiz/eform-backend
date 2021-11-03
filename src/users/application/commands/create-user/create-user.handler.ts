import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory, UserRepository } from 'users/domain';
import { v4 as uuid } from 'uuid';
import { CreateUserCommand } from 'users/application/commands/create-user';
import { InjectionToken } from 'users/application/commands/injection.token';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, string> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const id = uuid();

    const { aproperties } = command;

    const user = this.userFactory.create({
      id,
      firstname: aproperties.firstname,
      lastname: aproperties.lastname,
      documentNumber: aproperties.documentNumber,
      email: aproperties.email,
      phone: aproperties.phone,
      hasValidate: aproperties.hasValidate,
      closedAt: aproperties.closedAt,
      version: aproperties.version
    });

    user.open(aproperties.password);

    await this.userRepository.save(user);

    return id;
  }
}
