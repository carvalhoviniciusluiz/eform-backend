import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AnswerFactory, IAnswerRepository } from 'answers/domain';
import { UpdateAnswerCommand } from 'answers/application/commands/update-answer';
import { IQuestionRepository } from 'questions/domain';
import { QUESTION_REPOSITORY, ANSWER_REPOSITORY } from '../../../../constants';

@CommandHandler(UpdateAnswerCommand)
export class UpdateAnswerHandler implements ICommandHandler<UpdateAnswerCommand, void> {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: IQuestionRepository,

    @Inject(ANSWER_REPOSITORY)
    private readonly answerRepository: IAnswerRepository,
    private readonly answerFactory: AnswerFactory
  ) {}

  async execute(command: UpdateAnswerCommand): Promise<void> {
    const { id, props } = command;

    if (props.questionId) {
      await this.questionRepository.findById(props.questionId);
    }

    if (props.questionId && props.content) {
      const found = await this.answerRepository.findByContent(props.questionId, props.content);
      if (found) {
        throw {
          surveyExists: true,
          surveycontent: props.content
        };
      }
    }

    const data = this.answerFactory.reconstitute({
      questionId: props.questionId,
      content: props.content
    });

    await this.answerRepository.update(id, data);
  }
}
