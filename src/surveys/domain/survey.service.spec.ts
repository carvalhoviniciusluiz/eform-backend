import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { SurveyService } from 'surveys/domain';

describe('SurveyService', () => {
  let service: SurveyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();
    service = module.get(SurveyService);
  });

  describe('save', () => {
    it('should return void', async () => {
      const props = {
        formId: 'formId',
        parentId: 'parentId',
        name: 'name'
      };

      service.save = jest.fn().mockReturnValue(null);

      expect(await service.save(props)).toBeNull();
      expect(service.save).toBeCalledTimes(1);
      expect(service.save).toBeCalledWith(props);
    });
  });

  describe('update', () => {
    it('should return void', async () => {
      const id = 'id';
      const props = {
        formId: 'formId',
        parentId: 'parentId',
        name: 'name'
      };

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
      const formid = 'formid';

      service.find = jest.fn().mockReturnValue(null);

      expect(await service.find(formid, page, pagesize)).toBeNull();
      expect(service.find).toBeCalledTimes(1);
      expect(service.find).toBeCalledWith(formid, page, pagesize);
    });
  });
});
