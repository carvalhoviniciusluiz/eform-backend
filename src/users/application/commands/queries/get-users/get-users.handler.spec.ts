import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { GetUsersCommand } from 'users/application/commands/queries/get-users/get-users.command';
import { GetUsersHandler } from 'users/application/commands/queries/get-users/get-users.handler';
import { InjectionConstant } from 'users/injection.constant';
import { IUserRepository } from 'users/domain/user.repository';
import { IUser } from 'users/domain';

import { v4 as uuid } from 'uuid';

describe('GetUsersHandler', () => {
  let handler: GetUsersHandler;
  let repository: IUserRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: InjectionConstant.USER_REPOSITORY,
      useValue: {}
    };
    const providers: Provider[] = [GetUsersHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(GetUsersHandler);
    repository = testModule.get(InjectionConstant.USER_REPOSITORY);
  });

  describe('execute', () => {
    const page = 0;
    const pagesize = 10;

    it('should execute GetUsersCommand', async () => {
      const resolvedValue: [[], number] = [[], 0];
      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetUsersCommand(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resolvedValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });

    it('should return a collection', async () => {
      const id = uuid();
      const updatedAt = new Date();
      const user: any = {
        props: () => ({
          id,
          updatedAt,
          firstname: 'firstname',
          lastname: 'lastname',
          documentNumber: 'documentNumber',
          email: 'email',
          phone: 'phone',
          hasValidate: false
        })
      };
      const resultValue = [
        [
          {
            id,
            updatedAt,
            document: {
              number: 'documentNumber'
            },
            email: 'email',
            firstname: 'firstname',
            hasValidate: false,
            lastname: 'lastname',
            phone: 'phone'
          }
        ],
        1
      ];

      const resolvedValue: [IUser[], number] = [[user], 1];
      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetUsersCommand(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resultValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });
  });
});
