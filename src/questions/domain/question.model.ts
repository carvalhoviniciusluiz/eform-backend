import { AggregateRoot } from '@nestjs/cqrs';
import { IQuestion, TQuestionEntity } from 'questions/domain';

export class QuestionModel extends AggregateRoot implements IQuestion {
  private id?: string;
  private content?: string;
  private createdAt?: Date | null = null;
  private version = 0;

  constructor(props: TQuestionEntity) {
    super();
    Object.assign(this, props);
  }
  createForm: () => void;

  props(): TQuestionEntity {
    return {
      id: this.id,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      version: this.version
    };
  }

  createQuestion: () => void;
}
