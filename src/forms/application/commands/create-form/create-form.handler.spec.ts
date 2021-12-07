import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { CreateFormCommand } from 'forms/application/commands/create-form/create-form.command';
import { CreateFormHandler } from 'forms/application/commands/create-form/create-form.handler';
import { FormFactory } from 'forms/domain/form.factory';
import { IFormRepository } from 'forms/domain/form.repository';
import { FORM_REPOSITORY } from '../../../../constants';

describe('CreateFormHandler', () => {
  let handler: CreateFormHandler;
  let repository: IFormRepository;
  let factory: FormFactory;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: FORM_REPOSITORY,
      useValue: {}
    };
    const factoryProvider: Provider = {
      provide: FormFactory,
      useValue: {}
    };
    const providers: Provider[] = [CreateFormHandler, repoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateFormHandler);
    repository = testModule.get(FORM_REPOSITORY);
    factory = testModule.get(FormFactory);
  });

  describe('execute', () => {
    it('should execute CreateFormCommand', async () => {
      const user = { createAccount: jest.fn(), props: () => jest.fn() };

      const name = 'name';

      factory.create = jest.fn().mockReturnValue(user);
      repository.save = jest.fn().mockResolvedValue(undefined);
      repository.findByName = jest.fn().mockResolvedValue(undefined);

      const command = new CreateFormCommand({ name });

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(user);
    });
  });
});
