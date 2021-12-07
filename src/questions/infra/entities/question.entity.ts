import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'common';

import { TABLE_PREFIX } from '../../../constants';
import { SurveyEntity } from 'surveys/infra';
import { AnswerEntity } from 'answers/infra';

@Entity(`${TABLE_PREFIX}questions`)
export class QuestionEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  content?: string;

  @Column('uuid', { name: 'survey_id' })
  surveyId: string;

  @ManyToOne(() => SurveyEntity, survey => survey.questions)
  @JoinColumn({ name: 'survey_id' })
  survey: SurveyEntity;

  @OneToMany(() => AnswerEntity, answer => answer.question, {
    cascade: ['insert', 'update']
  })
  answers: AnswerEntity[];
}
