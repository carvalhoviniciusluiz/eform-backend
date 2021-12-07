import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { FormFactory, IFormRepository } from 'forms/domain';
import { CreateFormCommand } from 'forms/application/commands/create-form';
import { FORM_REPOSITORY } from '../../../../constants';

@CommandHandler(CreateFormCommand)
export class CreateFormHandler implements ICommandHandler<CreateFormCommand, string> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository,
    private readonly formFactory: FormFactory
  ) {}

  async execute(command: CreateFormCommand): Promise<string> {
    const { props } = command;

    const found = await this.formRepository.findByName(props.name);
    if (found) {
      throw {
        formExists: true,
        name: props.name
      };
    }

    const id = uuid();

    const form = this.formFactory.create({
      id,
      name: props.name,
      version: props.version
    });

    // form.createForm();

    await this.formRepository.save(form);

    return id;
  }
}
