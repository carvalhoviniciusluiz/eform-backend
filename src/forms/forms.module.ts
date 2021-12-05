import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FormsController } from 'forms/presentation';
import * as ENV from '../constants';
import { FormRepository } from 'forms/infra';
import { FormFactory, FormService } from 'forms/domain';

const infrastructure = [
  {
    provide: ENV.FORM_REPOSITORY,
    useClass: FormRepository
  }
];
// const application = [];
const domain = [
  FormFactory,
  {
    provide: ENV.FORM_SERVICE,
    useClass: FormService
  }
];

@Module({
  imports: [CqrsModule],
  controllers: [FormsController],
  providers: [Logger, ...infrastructure, ...domain],
  exports: []
})
export class FormsModule {}
