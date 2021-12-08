import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuestionFactory, IQuestionRepository } from 'questions/domain';
import { UpdateQuestionCommand } from 'questions/application/commands/update-question';
import { QUESTION_REPOSITORY, SURVEY_REPOSITORY } from '../../../../constants';
import { ISurveyRepository } from 'surveys/domain';

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand, void> {
  constructor(
    @Inject(SURVEY_REPOSITORY)
    private readonly surveyRepository: ISurveyRepository,

    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: IQuestionRepository,
    private readonly questionFactory: QuestionFactory
  ) {}

  async execute(command: UpdateQuestionCommand): Promise<void> {
    const { id, props } = command;

    if (props.surveyId) {
      await this.surveyRepository.findById(props.surveyId);
    }

    if (props.surveyId && props.content) {
      const found = await this.questionRepository.findByContent(props.surveyId, props.content);
      if (found) {
        throw {
          surveyExists: true,
          surveycontent: props.content
        };
      }
    }

    const data = this.questionFactory.reconstitute({
      surveyId: props.surveyId,
      content: props.content
    });

    await this.questionRepository.update(id, data);
  }
}
