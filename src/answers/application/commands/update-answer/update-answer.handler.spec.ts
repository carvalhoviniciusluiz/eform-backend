import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UpdateAnswerCommand } from 'answers/application/commands/update-answer/update-answer.command';
import { UpdateAnswerHandler } from 'answers/application/commands/update-answer/update-answer.handler';
import { AnswerFactory } from 'answers/domain/answer.factory';
import { IAnswerRepository } from 'answers/domain/answer.repository';
import { IQuestionRepository } from 'questions/domain';
import { QUESTION_REPOSITORY, ANSWER_REPOSITORY } from '../../../../constants';

describe('UpdateAnswerHandler', () => {
  let questionRepository: IQuestionRepository;
  let answerRepository: IAnswerRepository;
  let handler: UpdateAnswerHandler;
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
    const providers: Provider[] = [UpdateAnswerHandler, repoProvider, formRepoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    questionRepository = testModule.get(QUESTION_REPOSITORY);
    answerRepository = testModule.get(ANSWER_REPOSITORY);
    handler = testModule.get(UpdateAnswerHandler);
    factory = testModule.get(AnswerFactory);
  });

  describe('execute', () => {
    it('should execute UpdateAnswerCommand', async () => {
      const account = {};
      const id = 'id';
      const props = { questionId: 'questionId', content: 'content' };

      questionRepository.findById = jest.fn().mockResolvedValue(undefined);
      answerRepository.update = jest.fn().mockResolvedValue(undefined);
      answerRepository.findByContent = jest.fn().mockResolvedValue(undefined);
      factory.reconstitute = jest.fn().mockReturnValue(account);

      const command = new UpdateAnswerCommand(id, props);

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(factory.reconstitute).toBeCalledTimes(1);
      expect(answerRepository.update).toBeCalledTimes(1);
    });
  });
});
