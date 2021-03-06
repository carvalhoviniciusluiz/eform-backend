import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ValidatePasswordUserCommand } from 'users/application/commands/validate-password-user/validate-password-user.command';
import { ValidatePasswordUserHandler } from 'users/application/commands/validate-password-user/validate-password-user.handle';
import { USER_REPOSITORY } from '../../../../constants';
import { IUserRepository } from 'users/domain';

describe('ValidatePasswordUserHandler', () => {
  let handler: ValidatePasswordUserHandler;
  let repository: IUserRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: USER_REPOSITORY,
      useValue: {}
    };
    const providers: Provider[] = [ValidatePasswordUserHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(ValidatePasswordUserHandler);
    repository = testModule.get(USER_REPOSITORY);
  });

  describe('execute', () => {
    it('should execute ValidatePasswordUserCommand', async () => {
      const userMock = {
        validatePassword: jest.fn().mockResolvedValue(true)
      };

      repository.findByCredential = jest.fn().mockResolvedValue(userMock);

      const command = new ValidatePasswordUserCommand('credential', 'password');

      await expect(handler.execute(command)).resolves.toBe(userMock);
      expect(repository.findByCredential).toBeCalledTimes(1);
      expect(repository.findByCredential).toBeCalledWith(command.credential);
      expect(userMock.validatePassword).toBeCalledTimes(1);
      expect(userMock.validatePassword).toBeCalledWith(command.password);
    });
  });
});
