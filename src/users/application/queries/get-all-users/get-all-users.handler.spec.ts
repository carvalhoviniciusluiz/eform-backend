import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { GetAllUsersQuery } from 'users/application/queries/get-all-users/get-all-users.query';
import { GetAllUsersHandler } from 'users/application/queries/get-all-users/get-all-users.handler';
import { IUserRepository } from 'users/domain/user.repository';
import { IUser } from 'users/domain';
import { USER_REPOSITORY } from 'users/../constants';

describe('GetAllUsersHandler', () => {
  let handler: GetAllUsersHandler;
  let repository: IUserRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: USER_REPOSITORY,
      useValue: {}
    };
    const providers: Provider[] = [GetAllUsersHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(GetAllUsersHandler);
    repository = testModule.get(USER_REPOSITORY);
  });

  describe('execute', () => {
    const page = 0;
    const pagesize = 10;

    it('should execute GetAllUsersQuery', async () => {
      const resolvedValue: [[], number] = [[], 0];
      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetAllUsersQuery(page, pagesize);

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

      const command = new GetAllUsersQuery(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resultValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });
  });
});
