import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'common';
import { QuestionEntity } from 'questions/infra';

import { TABLE_PREFIX } from '../../../constants';

@Entity(`${TABLE_PREFIX}answers`)
export class AnswerEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  content?: string;

  @ManyToOne(() => QuestionEntity, question => question.answers)
  question: QuestionEntity;
}
