import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

@Entity()
export class BaseEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'alternative_id', select: false })
  @Generated('increment')
  alternativeId?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt?: Date = new Date();

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    type: 'timestamp with time zone'
  })
  updatedAt?: Date = new Date();

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    type: 'timestamp with time zone'
  })
  deletedAt?: Date | null = null;

  @VersionColumn()
  version?: number = 0;
}
