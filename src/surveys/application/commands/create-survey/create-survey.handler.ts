import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { CreateSurveyCommand } from 'surveys/application/commands/create-survey';
import { SurveyFactory, ISurveyRepository } from 'surveys/domain';
import { IFormRepository } from 'forms/domain';
import { FORM_REPOSITORY, SURVEY_REPOSITORY } from '../../../../constants';

@CommandHandler(CreateSurveyCommand)
export class CreateSurveyHandler implements ICommandHandler<CreateSurveyCommand, string> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository,

    @Inject(SURVEY_REPOSITORY)
    private readonly surveyRepository: ISurveyRepository,
    private readonly surveyFactory: SurveyFactory
  ) {}

  async execute(command: CreateSurveyCommand): Promise<string> {
    const { props } = command;

    await this.formRepository.findById(props.formId);

    const surveyFound = await this.surveyRepository.findByName(props.name);
    if (surveyFound) {
      throw {
        surveyExists: true,
        surveyName: props.name
      };
    }

    const id = uuid();

    const survey = this.surveyFactory.create({
      id,
      formId: props.formId,
      name: props.name
    });

    // survey.createSurvey();

    await this.surveyRepository.save(survey);

    return id;
  }
}
