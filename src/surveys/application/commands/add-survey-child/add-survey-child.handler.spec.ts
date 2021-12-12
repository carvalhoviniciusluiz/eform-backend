import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IFormRepository } from 'forms/domain';

import { AddSurveyChildCommand } from 'surveys/application/commands/add-survey-child/add-survey-child.command';
import { AddSurveyChildHandler } from 'surveys/application/commands/add-survey-child/add-survey-child.handler';
import { ISurveyRepository } from 'surveys/domain';
import { SurveyFactory } from 'surveys/domain/survey.factory';
import { FORM_REPOSITORY, SURVEY_REPOSITORY } from '../../../../constants';

describe('AddSurveyChildHandler', () => {
  let formRepository: IFormRepository;
  let surveyRepository: ISurveyRepository;
  let handler: AddSurveyChildHandler;
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
    const providers: Provider[] = [AddSurveyChildHandler, repoProvider, formRepoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    formRepository = testModule.get(FORM_REPOSITORY);
    surveyRepository = testModule.get(SURVEY_REPOSITORY);
    handler = testModule.get(AddSurveyChildHandler);
    factory = testModule.get(SurveyFactory);
  });

  describe('execute', () => {
    it('should execute AddSurveyChildCommand', async () => {
      const user = { createAccount: jest.fn(), props: () => jest.fn() };

      formRepository.findById = jest.fn().mockResolvedValue(undefined);
      surveyRepository.save = jest.fn().mockResolvedValue(undefined);
      surveyRepository.findById = jest.fn().mockResolvedValue(undefined);
      surveyRepository.findByName = jest.fn().mockResolvedValue(undefined);
      factory.create = jest.fn().mockReturnValue(user);

      const command = new AddSurveyChildCommand({
        formId: 'formId',
        parentId: 'parentId',
        name: 'name'
      });

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(surveyRepository.save).toBeCalledTimes(1);
      expect(surveyRepository.save).toBeCalledWith(user);
    });
  });
});
