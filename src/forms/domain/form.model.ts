import { AggregateRoot } from '@nestjs/cqrs';
import { IForm, TFormEntity } from 'forms/domain';
import { FormStatusEnum } from 'forms/infra';

export class FormModel extends AggregateRoot implements IForm {
  private id?: string;
  private name?: string;
  private status?: FormStatusEnum;
  private createdAt?: Date | null = null;
  private version = 0;

  constructor(props: TFormEntity) {
    super();
    Object.assign(this, props);
  }

  props(): TFormEntity {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      version: this.version
    };
  }

  createForm: () => void;
  publicForm: () => void;
}
