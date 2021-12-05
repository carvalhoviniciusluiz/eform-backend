import { AggregateRoot } from '@nestjs/cqrs';
import { IAnswer, TAnswerEntity } from 'answers/domain';

export class AnswerModel extends AggregateRoot implements IAnswer {
  private id?: string;
  private content?: string;
  private createdAt?: Date | null = null;
  private version = 0;

  constructor(props: TAnswerEntity) {
    super();
    Object.assign(this, props);
  }
  createForm: () => void;

  props(): TAnswerEntity {
    return {
      id: this.id,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      version: this.version
    };
  }

  createAnswer: () => void;
}
