import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { AddSurveyChildCommand } from 'surveys/application/commands/add-survey-child';
import { SurveyFactory, ISurveyRepository } from 'surveys/domain';
import { IFormRepository } from 'forms/domain';
import { FORM_REPOSITORY, SURVEY_REPOSITORY } from '../../../../constants';

@CommandHandler(AddSurveyChildCommand)
export class AddSurveyChildHandler implements ICommandHandler<AddSurveyChildCommand, string> {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: IFormRepository,

    @Inject(SURVEY_REPOSITORY)
    private readonly surveyRepository: ISurveyRepository,
    private readonly surveyFactory: SurveyFactory
  ) {}

  async execute(command: AddSurveyChildCommand): Promise<string> {
    const { props } = command;

    const { uppercase } = props;

    await this.formRepository.findById(props.formId);

    const parentFound = await this.surveyRepository.findById(props.parentId);
    if (parentFound) {
      throw {
        parentExists: true,
        parentId: props.parentId
      };
    }

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
      parentId: props.parentId,
      name: uppercase ? props?.name?.toUpperCase() : props.name
    });

    // survey.addSurveyChild();

    await this.surveyRepository.save(survey);

    return id;
  }
}
