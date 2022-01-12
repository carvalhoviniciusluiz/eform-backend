import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { GetAllFormsQuery } from '@/forms/application/queries/get-all-forms/get-all-forms.query';
import { GetAllFormsHandler } from '@/forms/application/queries/get-all-forms/get-all-forms.handler';
import { IForm, IFormRepository } from '@/forms/domain';
import { FORM_REPOSITORY } from '../../../../constants';

describe('GetAllFormsHandler', () => {
  let handler: GetAllFormsHandler;
  let repository: IFormRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: FORM_REPOSITORY,
      useValue: {}
    };
    const providers: Provider[] = [GetAllFormsHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    repository = testModule.get(FORM_REPOSITORY);
    handler = testModule.get(GetAllFormsHandler);
  });

  describe('execute', () => {
    const page = 0;
    const pagesize = 10;

    it('should execute GetAllFormsQuery', async () => {
      const resolvedValue: [[], number] = [[], 0];
      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetAllFormsQuery(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resolvedValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });

    it('should return a collection', async () => {
      const id = uuid();
      const createdAt = new Date();
      const updatedAt = new Date();
      const form: any = {
        props: () => ({
          id,
          consumers: [
            {
              avatar: 'https://avatars.githubusercontent.com/u/22005684?v=4'
            },
            {
              firstname: 'Vinícius',
              lastname: 'Carvalho'
            }
          ],
          createdAt,
          updatedAt,
          name: 'name'
        })
      };
      const resultValue = [
        [
          {
            id,
            consumers: {
              avatars: [
                'https://avatars.githubusercontent.com/u/22005684?v=4',
                {
                  char: 'VC',
                  color: '#4fc9da',
                  backgroundColor: '#ddf8fc'
                }
              ],
              total: 2
            },
            createdAt,
            updatedAt,
            name: 'name'
          }
        ],
        1
      ];

      const resolvedValue: [IForm[], number] = [[form], 1];
      repository.find = jest.fn().mockResolvedValue(resolvedValue);

      const command = new GetAllFormsQuery(page, pagesize);

      await expect(handler.execute(command)).resolves.toEqual(resultValue);
      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(command.page, command.pagesize);
    });
  });
});
