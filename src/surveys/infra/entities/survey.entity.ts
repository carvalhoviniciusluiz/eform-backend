import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'common';
import { QuestionEntity } from 'questions/infra';

import { TABLE_PREFIX } from '../../../constants';
import { FormEntity } from 'forms/infra';

@Entity(`${TABLE_PREFIX}surveys`)
export class SurveyEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name?: string;

  @ManyToOne(() => FormEntity, form => form.surveys)
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  @OneToMany(() => QuestionEntity, question => question.survey, {
    cascade: ['insert', 'update']
  })
  questions: QuestionEntity[];
}
