import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FindByIdQuery } from 'forms/application/queries/find-by-id/find-by-id.query';
import { FindByIdHandler } from 'forms/application/queries/find-by-id/find-by-id.handler';
import { IFormRepository } from 'forms/domain';
import { FORM_REPOSITORY } from '../../../../constants';

describe('FindByIdHandler', () => {
  let handler: FindByIdHandler;
  let repository: IFormRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: FORM_REPOSITORY,
      useValue: {}
    };
    const providers: Provider[] = [FindByIdHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    repository = testModule.get(FORM_REPOSITORY);
    handler = testModule.get(FindByIdHandler);
  });

  describe('execute', () => {
    const id = '0000';

    it('should execute FindByIdQuery', async () => {
      const formMock = {
        id,
        name: 'name',
        updatedAt: 'updatedAt'
      };

      const resolvedValue = {
        props: () => formMock
      };
      repository.findById = jest.fn().mockResolvedValue(resolvedValue);

      const command = new FindByIdQuery(id);

      await expect(handler.execute(command)).resolves.toEqual(formMock);
      expect(repository.findById).toBeCalledTimes(1);
      expect(repository.findById).toBeCalledWith(command.id);
    });
  });
});
