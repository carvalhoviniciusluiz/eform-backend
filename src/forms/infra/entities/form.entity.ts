import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'common';

import { TABLE_PREFIX } from '../../../constants';
import { SurveyEntity } from 'surveys/infra';

@Entity(`${TABLE_PREFIX}forms`)
export class FormEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name?: string;

  @OneToMany(() => SurveyEntity, survey => survey.form, {
    cascade: ['insert', 'update']
  })
  surveys: SurveyEntity[];
}
