import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'common';
import { QuestionEntity } from 'questions/infra';

import { TABLE_PREFIX } from '../../../constants';

@Entity(`${TABLE_PREFIX}answers`)
export class AnswerEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  content?: string;

  @Column('uuid', { name: 'question_id' })
  questionId: string;

  @ManyToOne(() => QuestionEntity, question => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}
