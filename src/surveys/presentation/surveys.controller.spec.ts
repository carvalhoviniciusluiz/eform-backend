import { Test, TestingModule } from '@nestjs/testing';
import { SurveysController } from 'surveys/presentation/surveys.controller';
import { ISurveyService } from 'surveys/domain';
import { SURVEY_SERVICE } from '../../constants';

import { v4 as uuid } from 'uuid';

describe('SurveysController', () => {
  let controller: SurveysController;
  let service: ISurveyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SurveysController],
      providers: [
        {
          provide: SURVEY_SERVICE,
          useValue: jest.fn()
        }
      ]
    }).compile();

    service = app.get(SURVEY_SERVICE);
    controller = app.get<SurveysController>(SurveysController);
  });

  describe('save', () => {
    it('should return undefined', async () => {
      const body = {
        formId: 'formId',
        name: 'name'
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
        formId: 'formId',
        name: 'name'
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
        name: 'documentNumber'
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
      const formid = 'formid';

      service.find = jest.fn().mockReturnValue(returnValue);

      await expect(controller.find({ formid, page, pagesize })).resolves.toEqual(resultValue);
      expect(service.find).toBeCalledTimes(1);
      expect(service.find).toBeCalledWith(formid, page, pagesize);
    });
  });
});
