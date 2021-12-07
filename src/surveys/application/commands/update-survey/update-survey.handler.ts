import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SurveyFactory, ISurveyRepository } from 'surveys/domain';
import { UpdateSurveyCommand } from 'surveys/application/commands/update-survey';
import { FORM_REPOSITORY, SURVEY_REPOSITORY } from '../../../../constants';
import { IFormRepository } from 'forms/domain';

@CommandHandler(UpdateSurveyCommand)
export class UpdateSurveyHandler implements ICommandHandler<UpdateSurveyCommand, void> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository,

    @Inject(SURVEY_REPOSITORY)
    private readonly surveyRepository: ISurveyRepository,
    private readonly surveyFactory: SurveyFactory
  ) {}

  async execute(command: UpdateSurveyCommand): Promise<void> {
    const { id, props } = command;

    if (props.formId) {
      await this.formRepository.findById(props.formId);
    }

    if (props.name) {
      const found = await this.surveyRepository.findByName(props.name);
      if (found) {
        throw {
          surveyExists: true,
          surveyName: props.name
        };
      }
    }

    const data = this.surveyFactory.reconstitute({
      formId: props.formId,
      name: props.name
    });

    await this.surveyRepository.update(id, data);
  }
}
