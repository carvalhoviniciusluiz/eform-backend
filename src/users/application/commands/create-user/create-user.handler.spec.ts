import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { CreateUserCommand } from 'users/application/commands/create-user/create-user.command';
import { CreateUserHandler } from 'users/application/commands/create-user/create-user.handler';
import { UserFactory } from 'users/domain/user.factory';
import { USER_REPOSITORY } from 'users/../constants';
import { IUserRepository } from 'users/domain/user.repository';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let repository: IUserRepository;
  let factory: UserFactory;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: USER_REPOSITORY,
      useValue: {}
    };
    const factoryProvider: Provider = {
      provide: UserFactory,
      useValue: {}
    };
    const providers: Provider[] = [CreateUserHandler, repoProvider, factoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateUserHandler);
    repository = testModule.get(USER_REPOSITORY);
    factory = testModule.get(UserFactory);
  });

  describe('execute', () => {
    it('should execute CreateUserCommand', async () => {
      const account = { createAccount: jest.fn() };

      const password = 'password';

      factory.create = jest.fn().mockReturnValue(account);
      repository.save = jest.fn().mockResolvedValue(undefined);

      const command = new CreateUserCommand({ password });

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(account.createAccount).toBeCalledTimes(1);
      expect(account.createAccount).toBeCalledWith(command.props.password);
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(account);
    });
  });
});
