import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { GetAllAnswersQuery } from 'answers/application/queries/get-all-answers/get-all-answers.query';
import { GetAllAnswersHandler } from 'answers/application/queries/get-all-answers/get-all-answers.handler';
import { IAnswerRepository } from 'answers/domain/answer.repository';
import { ANSWER_REPOSITORY } from '../../../../constants';

describe('GetAllAnswersHandler', () => {
  let handler: GetAllAnswersHandler;
  let repository: IAnswerRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: ANSWER_REPOSITORY,
      useValue: {}
    };
    const providers: Provider[] = [GetAllAnswersHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    repository = testModule.get(ANSWER_REPOSITORY);
    handler = testModule.get(GetAllAnswersHandler);
  });

  describe('execute', () => {
    const page = 0;
    const pagesize = 10;

    it('should execute GetAllAnswersQuery', async () => {
      const resolvedValue: [[], number] = [[], 0];
      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetAllAnswersQuery(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resolvedValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });

    it('should return a collection', async () => {
      const id = uuid();
      const surveyMock = {
        id,
        updatedAt: new Date(),
        content: 'content'
      };
      const entityMock = {
        props: () => surveyMock
      };
      const resultValue = [[surveyMock], 1];
      const resolvedValue = [[entityMock], 1];

      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetAllAnswersQuery(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resultValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });
  });
});
