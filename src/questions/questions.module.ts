import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QuestionsController } from 'questions/presentation';
import * as ENV from '../constants';
import { QuestionRepository } from 'questions/infra';
import { QuestionFactory, QuestionService } from 'questions/domain';

const infrastructure = [
  {
    provide: ENV.QUESTION_REPOSITORY,
    useClass: QuestionRepository
  }
];
// const application = [];
const domain = [
  QuestionFactory,
  {
    provide: ENV.QUESTION_SERVICE,
    useClass: QuestionService
  }
];

@Module({
  imports: [CqrsModule],
  controllers: [QuestionsController],
  providers: [Logger, ...infrastructure, ...domain],
  exports: []
})
export class QuestionsModule {}
