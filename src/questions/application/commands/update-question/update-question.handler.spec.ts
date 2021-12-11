import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { UpdateSurveyCommand } from 'surveys/application/commands/update-survey/update-survey.command';
import { UpdateSurveyHandler } from 'surveys/application/commands/update-survey/update-survey.handler';
import { SurveyFactory } from 'surveys/domain/survey.factory';
import { IFormRepository } from 'forms/domain';
import { ISurveyRepository } from 'surveys/domain';
import { FORM_REPOSITORY, SURVEY_REPOSITORY } from '../../../../constants';

describe('UpdateSurveyHandler', () => {
  let formRepository: IFormRepository;
  let surveyRepository: ISurveyRepository;
  let handler: UpdateSurveyHandler;
  let factory: SurveyFactory;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: SURVEY_REPOSITORY,
      useValue: jest.fn()
    };
    const formRepoProvider: Provider = {
      provide: FORM_REPOSITORY,
      useClass: jest.fn()
    };
    const factoryProvider: Provider = {
      provide: SurveyFactory,
      useValue: jest.fn()
    };
    const providers: Provider[] = [UpdateSurveyHandler, repoProvider, formRepoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    formRepository = testModule.get(FORM_REPOSITORY);
    surveyRepository = testModule.get(SURVEY_REPOSITORY);
    handler = testModule.get(UpdateSurveyHandler);
    factory = testModule.get(SurveyFactory);
  });

  describe('execute', () => {
    it('should execute UpdateSurveyCommand', async () => {
      const account = {};
      const id = uuid();
      const props = { formId: 'formId', name: 'name' };

      formRepository.findById = jest.fn().mockResolvedValue(undefined);
      surveyRepository.update = jest.fn().mockResolvedValue(undefined);
      surveyRepository.findByName = jest.fn().mockResolvedValue(undefined);
      factory.reconstitute = jest.fn().mockReturnValue(account);

      const command = new UpdateSurveyCommand(id, props);

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(factory.reconstitute).toBeCalledTimes(1);
      expect(surveyRepository.update).toBeCalledTimes(1);
    });
  });
});
