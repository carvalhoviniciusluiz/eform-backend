import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UpdateFormCommand } from 'forms/application/commands/update-form/update-form.command';
import { UpdateFormHandler } from 'forms/application/commands/update-form/update-form.handler';
import { FormFactory } from 'forms/domain/form.factory';
import { IFormRepository } from 'forms/domain';
import { FORM_REPOSITORY } from '../../../../constants';

describe('UpdateFormHandler', () => {
  let handler: UpdateFormHandler;
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
    const providers: Provider[] = [UpdateFormHandler, repoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    repository = testModule.get(FORM_REPOSITORY);
    handler = testModule.get(UpdateFormHandler);
    factory = testModule.get(FormFactory);
  });

  describe('execute', () => {
    it('should execute UpdateFormCommand', async () => {
      const account = {};
      const id = 'id';
      const props = {};

      factory.reconstitute = jest.fn().mockReturnValue(account);
      repository.update = jest.fn().mockResolvedValue(undefined);
      repository.findByName = jest.fn().mockResolvedValue(undefined);

      const command = new UpdateFormCommand(id, props);

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(factory.reconstitute).toBeCalledTimes(1);
      expect(repository.update).toBeCalledTimes(1);
    });
  });
});
