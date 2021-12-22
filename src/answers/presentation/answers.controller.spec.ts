import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from 'answers/presentation/answers.controller';
import { IAnswerService } from 'answers/domain';
import { ANSWER_SERVICE } from '../../constants';

import { v4 as uuid } from 'uuid';

describe('AnswersController', () => {
  let controller: AnswersController;
  let service: IAnswerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        {
          provide: ANSWER_SERVICE,
          useValue: jest.fn()
        }
      ]
    }).compile();

    service = app.get(ANSWER_SERVICE);
    controller = app.get<AnswersController>(AnswersController);
  });

  describe('save', () => {
    it('should return undefined', async () => {
      const body = {
        content: 'content'
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
        content: 'content'
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
        content: 'content'
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
        rows: [body]
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
