import { AggregateRoot } from '@nestjs/cqrs';
import { ISurvey, TSurveyEntity } from 'surveys/domain';

export class SurveyModel extends AggregateRoot implements ISurvey {
  private id?: string;
  private name?: string;
  private createdAt?: Date | null = null;
  private version = 0;

  constructor(props: TSurveyEntity) {
    super();
    Object.assign(this, props);
  }
  createForm: () => void;

  props(): TSurveyEntity {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      version: this.version
    };
  }

  createSurvey: () => void;
}
