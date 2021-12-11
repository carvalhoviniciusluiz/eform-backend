import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { CreateAnswerCommand } from 'answers/application/commands/create-answer';
import { AnswerFactory, IAnswerRepository } from 'answers/domain';
import { IQuestionRepository } from 'questions/domain';
import { QUESTION_REPOSITORY, ANSWER_REPOSITORY } from '../../../../constants';

@CommandHandler(CreateAnswerCommand)
export class CreateAnswerHandler implements ICommandHandler<CreateAnswerCommand, string> {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: IQuestionRepository,

    @Inject(ANSWER_REPOSITORY)
    private readonly answerRepository: IAnswerRepository,
    private readonly answerFactory: AnswerFactory
  ) {}

  async execute(command: CreateAnswerCommand): Promise<string> {
    const { props } = command;

    await this.questionRepository.findById(props.questionId);

    const questionFound = await this.answerRepository.findByContent(props.questionId, props.content);
    if (questionFound) {
      throw {
        questionExists: true,
        questionContent: props.content
      };
    }

    const id = uuid();

    const answer = this.answerFactory.create({
      id,
      questionId: props.questionId,
      content: props.content
    });

    // answer.createAnswer();

    await this.answerRepository.save(answer);

    return id;
  }
}
