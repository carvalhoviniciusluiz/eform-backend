import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UpdateUserCommand } from 'users/application/commands/mutations/update-user/update-user.command';
import { UpdateUserHandler } from 'users/application/commands/mutations/update-user/update-user.handler';
import { InjectionConstant } from 'users/injection.constant';
import { UserFactory } from 'users/domain/user.factory';

import { IUserRepository } from 'users/domain/user.repository';

import { v4 as uuid } from 'uuid';

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;
  let repository: IUserRepository;
  let factory: UserFactory;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: InjectionConstant.USER_REPOSITORY,
      useValue: {}
    };
    const factoryProvider: Provider = {
      provide: UserFactory,
      useValue: {}
    };
    const providers: Provider[] = [UpdateUserHandler, repoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(UpdateUserHandler);
    repository = testModule.get(InjectionConstant.USER_REPOSITORY);
    factory = testModule.get(UserFactory);
  });

  describe('execute', () => {
    it('should execute UpdateUserCommand', async () => {
      const account = {};
      const id = uuid();
      const props = {};

      factory.reconstitute = jest.fn().mockReturnValue(account);
      repository.update = jest.fn().mockResolvedValue(undefined);

      const command = new UpdateUserCommand(id, props);

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(factory.reconstitute).toBeCalledTimes(1);
      expect(repository.update).toBeCalledTimes(1);
    });
  });
});
