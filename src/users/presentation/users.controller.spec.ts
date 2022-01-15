import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from 'users/presentation/users.controller';
import { IUserService } from 'users/domain';
import { USER_SERVICE } from 'users/../constants';

import { v4 as uuid } from 'uuid';

describe('UsersController', () => {
  let controller: UsersController;
  let service: IUserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: USER_SERVICE,
          useValue: jest.fn()
        }
      ]
    }).compile();

    service = app.get(USER_SERVICE);
    controller = app.get<UsersController>(UsersController);
  });

  describe('save', () => {
    it('should return undefined', async () => {
      const body = {
        documentNumber: 'documentNumber',
        email: 'email',
        firstname: 'firstname',
        lastname: 'lastname',
        password: 'password',
        phone: 'phone'
      };

      service.save = jest.fn().mockReturnValue(body);

      await expect(controller.store(body)).resolves.toBeUndefined();
      expect(service.save).toBeCalledTimes(1);
      expect(service.save).toBeCalledWith(body);
    });
  });

  describe('update', () => {
    it('should return undefined', async () => {
      const body = {
        documentNumber: 'documentNumber',
        email: 'email',
        firstname: 'firstname',
        lastname: 'lastname',
        password: 'password',
        phone: 'phone'
      };

      const id = uuid();

      service.update = jest.fn().mockReturnValue(body);

      await expect(controller.update(id, body)).resolves.toBeUndefined();
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, body);
    });
  });

  describe('find', () => {
    it('should return undefined', async () => {
      const body = {
        documentNumber: 'documentNumber',
        email: 'email',
        firstname: 'firstname',
        lastname: 'lastname',
        password: 'password',
        phone: 'phone'
      };

      const returnValue = [[body], 1];

      const resultValue = {
        meta: {
          count: 1,
          page: 1,
          pageSize: 10,
          pageCount: 1,
          pageNumberIsGood: true,
          hasPreviousPage: true,
          hasNextPage: false,
          isFirstPage: false,
          isLastPage: false,
          numberOfFirstItemOnPage: 10,
          firstItemOnPage: 10,
          numberOfLastItemOnPage: 10,
          lastItemOnPage: 0
        },
        data: [body]
      };

      const page = 1;
      const pagesize = 10;

      service.find = jest.fn().mockReturnValue(returnValue);

      await expect(controller.find({ page, pagesize })).resolves.toEqual(resultValue);
      expect(service.find).toBeCalledTimes(1);
      expect(service.find).toBeCalledWith(page, pagesize);
    });
  });
});
