import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'common';

import { TABLE_PREFIX } from 'users/../constants'

@Entity(`${TABLE_PREFIX}users`)
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  firstname?: string;

  @Column({ type: 'varchar', nullable: true })
  lastname?: string;

  @Column({ type: 'varchar', name: 'document_number' })
  documentNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash?: string;

  @Column({ type: 'varchar' })
  salt?: string;

  @Column({ type: 'boolean', default: false, name: 'has_validate' })
  hasValidate = false;

  @Column({
    name: 'closed_at',
    nullable: true,
    type: 'timestamp with time zone'
  })
  closedAt: Date | null = null;
}
