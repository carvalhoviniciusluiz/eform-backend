import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SurveysController } from 'surveys/presentation';
import * as ENV from '../constants';
import { SurveyRepository } from 'surveys/infra';
import { SurveyFactory, SurveyService } from 'surveys/domain';

const infrastructure = [
  {
    provide: ENV.SURVEY_REPOSITORY,
    useClass: SurveyRepository
  }
];
// const application = [];
const domain = [
  SurveyFactory,
  {
    provide: ENV.SURVEY_SERVICE,
    useClass: SurveyService
  }
];

@Module({
  imports: [CqrsModule],
  controllers: [SurveysController],
  providers: [Logger, ...infrastructure, ...domain],
  exports: []
})
export class SurveysModule {}
