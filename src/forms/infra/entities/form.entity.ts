import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'common';
import { SurveyEntity } from 'surveys/infra';
import { UserEntity } from 'users/infra';
import { TABLE_PREFIX } from '../../../constants';

export enum FormStatusEnum {
  PUBLISHED = 'published',
  REVIEWED = 'reviewed',
  REMOVED = 'removed'
}

@Entity(`${TABLE_PREFIX}forms`)
export class FormEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name?: string;

  @OneToMany(() => SurveyEntity, survey => survey.form, {
    cascade: ['insert', 'update']
  })
  surveys: SurveyEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  consumers: UserEntity[];

  @Column({
    type: 'enum',
    enum: FormStatusEnum,
    default: FormStatusEnum.REVIEWED
  })
  status: FormStatusEnum;
}
