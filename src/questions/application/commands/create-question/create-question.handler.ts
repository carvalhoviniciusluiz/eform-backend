import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { CreateQuestionCommand } from 'questions/application/commands/create-question';
import { QuestionFactory, IQuestionRepository } from 'questions/domain';
import { SURVEY_REPOSITORY, QUESTION_REPOSITORY } from '../../../../constants';
import { ISurveyRepository } from 'surveys/domain';

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand, string> {
  constructor(
    @Inject(SURVEY_REPOSITORY)
    private readonly surveyRepository: ISurveyRepository,

    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: IQuestionRepository,
    private readonly questionFactory: QuestionFactory
  ) {}

  async execute(command: CreateQuestionCommand): Promise<string> {
    const { props } = command;

    await this.surveyRepository.findById(props.surveyId);

    const questionFound = await this.questionRepository.findByContent(props.surveyId, props.content);
    if (questionFound) {
      throw {
        questionExists: true,
        questionContent: props.content
      };
    }

    const id = uuid();

    const question = this.questionFactory.create({
      id,
      surveyId: props.surveyId,
      content: props.content
    });

    // question.createQuestion();

    await this.questionRepository.save(question);

    return id;
  }
}
