import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UserService } from 'users/domain';

import { v4 as uuid } from 'uuid';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();
    service = module.get(UserService);
  });

  describe('save', () => {
    it('should return void', async () => {
      const props = { id: uuid() };

      service.save = jest.fn().mockReturnValue(null);

      expect(await service.save(props)).toBeNull();
      expect(service.save).toBeCalledTimes(1);
      expect(service.save).toBeCalledWith(props);
    });
  });

  describe('update', () => {
    it('should return void', async () => {
      const id = uuid();
      const props = {};

      service.update = jest.fn().mockReturnValue(null);

      expect(await service.update(id, props)).toBeNull();
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, props);
    });
  });

  describe('find', () => {
    it('should return undefined', async () => {
      const page = 0;
      const pagesize = 20;

      service.find = jest.fn().mockReturnValue(null);

      expect(await service.find(page, pagesize)).toBeNull();
      expect(service.find).toBeCalledTimes(1);
      expect(service.find).toBeCalledWith(page, pagesize);
    });
  });
});
