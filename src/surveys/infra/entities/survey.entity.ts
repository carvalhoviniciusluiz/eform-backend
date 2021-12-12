import { Entity, Column, OneToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { BaseEntity } from 'common';
import { QuestionEntity } from 'questions/infra';
import { FormEntity } from 'forms/infra';
import { TABLE_PREFIX } from '../../../constants';

@Entity(`${TABLE_PREFIX}surveys`)
export class SurveyEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name?: string;

  @Column('uuid', { name: 'form_id' })
  formId: string;

  @ManyToOne(() => FormEntity, form => form.surveys)
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  @OneToMany(() => QuestionEntity, question => question.survey, {
    cascade: ['insert', 'update']
  })
  questions: QuestionEntity[];

  @Column('uuid', { name: 'parent_id', nullable: true })
  parentId: string;

  @ManyToOne(() => SurveyEntity, parent => parent.children)
  @JoinColumn({ name: 'parent_id' })
  parent: SurveyEntity;

  @OneToMany(() => SurveyEntity, child => child.parent, {
    cascade: ['insert', 'update']
  })
  @JoinTable()
  children: SurveyEntity[];
}
