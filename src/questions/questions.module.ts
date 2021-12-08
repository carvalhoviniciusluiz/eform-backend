import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QuestionsController } from 'questions/presentation';
import * as ENV from '../constants';
import { QuestionRepository } from 'questions/infra';
import { QuestionFactory, QuestionService } from 'questions/domain';
import { CreateQuestionHandler, GetAllQuestionsHandler, UpdateQuestionHandler } from './application';
import { SurveyRepository } from 'surveys/infra';
import { SurveyFactory } from 'surveys/domain';

const infrastructure = [
  SurveyFactory,
  {
    provide: ENV.SURVEY_REPOSITORY,
    useClass: SurveyRepository
  },
  {
    provide: ENV.QUESTION_REPOSITORY,
    useClass: QuestionRepository
  }
];
const application = [GetAllQuestionsHandler, CreateQuestionHandler, UpdateQuestionHandler];
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
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: []
})
export class QuestionsModule {}
