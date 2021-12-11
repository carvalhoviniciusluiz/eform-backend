import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IQuestionRepository } from 'questions/domain';
import { CreateAnswerCommand } from 'answers/application/commands/create-answer/create-answer.command';
import { CreateAnswerHandler } from 'answers/application/commands/create-answer/create-answer.handler';
import { AnswerFactory } from 'answers/domain/answer.factory';
import { IAnswerRepository } from 'answers/domain/answer.repository';
import { QUESTION_REPOSITORY, ANSWER_REPOSITORY } from '../../../../constants';

describe('CreateAnswerHandler', () => {
  let questionRepository: IQuestionRepository;
  let answerRepository: IAnswerRepository;
  let handler: CreateAnswerHandler;
  let factory: AnswerFactory;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: ANSWER_REPOSITORY,
      useValue: jest.fn()
    };
    const formRepoProvider: Provider = {
      provide: QUESTION_REPOSITORY,
      useClass: jest.fn()
    };
    const factoryProvider: Provider = {
      provide: AnswerFactory,
      useValue: jest.fn()
    };
    const providers: Provider[] = [CreateAnswerHandler, repoProvider, formRepoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    questionRepository = testModule.get(QUESTION_REPOSITORY);
    answerRepository = testModule.get(ANSWER_REPOSITORY);
    handler = testModule.get(CreateAnswerHandler);
    factory = testModule.get(AnswerFactory);
  });

  describe('execute', () => {
    it('should execute CreateAnswerCommand', async () => {
      const user = { createAccount: jest.fn(), props: () => jest.fn() };

      questionRepository.findById = jest.fn().mockResolvedValue(undefined);
      answerRepository.save = jest.fn().mockResolvedValue(undefined);
      answerRepository.findByContent = jest.fn().mockResolvedValue(undefined);
      factory.create = jest.fn().mockReturnValue(user);

      const command = new CreateAnswerCommand({ questionId: 'questionId', content: 'content' });

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(answerRepository.save).toBeCalledTimes(1);
      expect(answerRepository.save).toBeCalledWith(user);
    });
  });
});
