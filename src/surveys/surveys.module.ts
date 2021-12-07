import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SurveysController } from 'surveys/presentation';
import * as ENV from '../constants';
import { SurveyRepository } from 'surveys/infra';
import { SurveyFactory, SurveyService } from 'surveys/domain';
import { CreateSurveyHandler, GetAllSurveysHandler, UpdateSurveyHandler } from 'surveys/application';
import { FormRepository } from 'forms/infra';
import { FormFactory } from 'forms/domain';

const infrastructure = [
  {
    provide: ENV.FORM_REPOSITORY,
    useClass: FormRepository
  },
  {
    provide: ENV.SURVEY_REPOSITORY,
    useClass: SurveyRepository
  }
];
const application = [GetAllSurveysHandler, CreateSurveyHandler, UpdateSurveyHandler];
const domain = [
  FormFactory,
  SurveyFactory,
  {
    provide: ENV.SURVEY_SERVICE,
    useClass: SurveyService
  }
];

@Module({
  imports: [CqrsModule],
  controllers: [SurveysController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: []
})
export class SurveysModule {}
