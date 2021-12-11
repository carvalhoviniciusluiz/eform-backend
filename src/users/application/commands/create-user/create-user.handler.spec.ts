import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'users/application/commands/create-user/create-user.command';
import { CreateUserHandler } from 'users/application/commands/create-user/create-user.handler';
import { UserFactory } from 'users/domain/user.factory';
import { IUserRepository } from 'users/domain';
import { USER_REPOSITORY } from '../../../../constants';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let repository: IUserRepository;
  let factory: UserFactory;
  let eventBus: EventBus;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: USER_REPOSITORY,
      useValue: {}
    };
    const factoryProvider: Provider = {
      provide: UserFactory,
      useValue: {}
    };
    const providers: Provider[] = [
      {
        provide: EventBus,
        useValue: jest.fn()
      },
      CreateUserHandler,
      repoProvider,
      factoryProvider
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateUserHandler);
    repository = testModule.get(USER_REPOSITORY);
    factory = testModule.get(UserFactory);
    eventBus = testModule.get(EventBus);
  });

  describe('execute', () => {
    it('should execute CreateUserCommand', async () => {
      const user = { createAccount: jest.fn(), props: () => jest.fn() };

      const password = 'password';

      factory.create = jest.fn().mockReturnValue(user);
      repository.save = jest.fn().mockResolvedValue(undefined);
      repository.findByEmail = jest.fn().mockResolvedValue(undefined);
      repository.findByDocumentNumber = jest.fn().mockResolvedValue(undefined);
      eventBus.publish = jest.fn();

      const command = new CreateUserCommand({ password });

      await expect(handler.execute(command)).resolves.not.toBeNull();
      expect(user.createAccount).toBeCalledTimes(1);
      expect(user.createAccount).toBeCalledWith(command.props.password);
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(user);
      expect(eventBus.publish).toBeCalledTimes(1);
    });
  });
});
