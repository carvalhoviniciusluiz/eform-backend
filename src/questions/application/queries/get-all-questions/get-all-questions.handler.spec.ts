import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { GetAllSurveysQuery } from 'surveys/application/queries/get-all-surveys/get-all-surveys.query';
import { GetAllSurveysHandler } from 'surveys/application/queries/get-all-surveys/get-all-surveys.handler';
import { ISurveyRepository } from 'surveys/domain';
import { SURVEY_REPOSITORY } from '../../../../constants';

describe('GetAllSurveysHandler', () => {
  let handler: GetAllSurveysHandler;
  let repository: ISurveyRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: SURVEY_REPOSITORY,
      useValue: {}
    };
    const providers: Provider[] = [GetAllSurveysHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    repository = testModule.get(SURVEY_REPOSITORY);
    handler = testModule.get(GetAllSurveysHandler);
  });

  describe('execute', () => {
    const page = 0;
    const pagesize = 10;

    it('should execute GetAllSurveysQuery', async () => {
      const resolvedValue: [[], number] = [[], 0];
      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetAllSurveysQuery(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resolvedValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });

    it('should return a collection', async () => {
      const id = uuid();
      const surveyMock = {
        id,
        updatedAt: new Date(),
        name: 'name'
      };
      const entityMock = {
        props: () => surveyMock
      };
      const resultValue = [[surveyMock], 1];
      const resolvedValue = [[entityMock], 1];

      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetAllSurveysQuery(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resultValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });
  });
});
