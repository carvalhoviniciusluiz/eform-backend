import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AnswersController } from 'answers/presentation';
import * as ENV from '../constants';
import { AnswerRepository } from 'answers/infra';
import { AnswerFactory, AnswerService } from 'answers/domain';

const infrastructure = [
  {
    provide: ENV.ANSWER_REPOSITORY,
    useClass: AnswerRepository
  }
];
// const application = [];
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
  providers: [Logger, ...infrastructure, ...domain],
  exports: []
})
export class AnswersModule {}
