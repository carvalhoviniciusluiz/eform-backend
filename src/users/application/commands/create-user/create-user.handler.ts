import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory, IUserRepository } from 'users/domain';
import { v4 as uuid } from 'uuid';
import { CreateUserCommand } from 'users/application/commands/create-user';
import { USER_REPOSITORY } from 'users/../constants';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, string> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly userFactory: UserFactory
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const { props } = command;

    const foundEmail = await this.userRepository.findByEmail(props.email);
    if (foundEmail) {
      throw {
        emailExists: true,
        email: props.email
      };
    }

    const foundDocumentNumber = await this.userRepository.findByDocumentNumber(props.documentNumber);
    if (foundDocumentNumber) {
      throw {
        documentNumberExists: true,
        documentNumber: props.documentNumber
      };
    }

    const id = uuid();

    const user = this.userFactory.create({
      id,
      firstname: props.firstname,
      lastname: props.lastname,
      documentNumber: props.documentNumber,
      email: props.email,
      phone: props.phone,
      hasValidate: props.hasValidate,
      closedAt: props.closedAt,
      version: props.version
    });

    user.createAccount(props.password);

    await this.userRepository.save(user);

    return id;
  }
}
