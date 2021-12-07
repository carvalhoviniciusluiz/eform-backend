import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FormFactory, IFormRepository } from 'forms/domain';
import { UpdateFormCommand } from 'forms/application/commands/update-form';
import { FORM_REPOSITORY } from '../../../../constants';

@CommandHandler(UpdateFormCommand)
export class UpdateFormHandler implements ICommandHandler<UpdateFormCommand, void> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository,
    private readonly formFactory: FormFactory
  ) {}

  async execute(command: UpdateFormCommand): Promise<void> {
    const { id, props } = command;

    const found = await this.formRepository.findByName(props.name);
    if (found) {
      throw {
        formExists: true,
        formName: props.name
      };
    }

    const data = this.formFactory.reconstitute({
      name: props.name,
      version: props.version
    });

    await this.formRepository.update(id, data);
  }
}
