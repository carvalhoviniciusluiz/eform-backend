import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AnswersController } from 'answers/presentation';
import * as ENV from '../constants';
import { AnswerRepository } from 'answers/infra';
import { AnswerFactory, AnswerService } from 'answers/domain';
import { CreateAnswerHandler, GetAllAnswersHandler, UpdateAnswerHandler } from './application';
import { QuestionRepository } from 'questions/infra';
import { QuestionFactory } from 'questions/domain';

const infrastructure = [
  QuestionFactory,
  {
    provide: ENV.QUESTION_REPOSITORY,
    useClass: QuestionRepository
  },
  {
    provide: ENV.ANSWER_REPOSITORY,
    useClass: AnswerRepository
  }
];
const application = [GetAllAnswersHandler, CreateAnswerHandler, UpdateAnswerHandler];
const domain = [
  AnswerFactory,
  {
    provide: ENV.ANSWER_SERVICE,
    useClass: AnswerService
  }
];

@Module({
  imports: [CqrsModule],
  controllers: [AnswersController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: []
})
export class AnswersModule {}
