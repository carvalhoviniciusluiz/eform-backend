import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UserException } from 'users/domain';

export type UserProperties = {
  readonly id?: string;
  readonly firstname?: string;
  readonly documentNumber?: string;
  readonly lastname?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly hasValidate?: boolean;
  readonly password?: string;
  readonly updatedAt?: Date;
  readonly closedAt?: Date | null;
  readonly version?: number;
};

export interface IUser {
  properties: () => UserProperties;
  open: (password: string) => void;
  updatePassword: (password: string, data: string) => void;
  close: (password: string) => void;
}

export class UserImplement extends AggregateRoot implements IUser {
  private id?: string;
  private firstname?: string;
  private lastname?: string;
  private documentNumber?: string;
  private email?: string;
  private phone?: string;
  private hasValidate = false;
  private password?: string;
  private closedAt?: Date | null = null;
  private version = 0;

  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      documentNumber: this.documentNumber,
      email: this.email,
      phone: this.phone,
      hasValidate: this.hasValidate,
      password: this.password,
      updatedAt: new Date(),
      closedAt: this.closedAt,
      version: this.version
    };
  }

  open(password: string): void {
    if (this.email === '' || this.documentNumber === '' || password === '') throw UserException.canNotOpenUser(this.id);

    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
  }

  close(password: string): void {
    if (!this.comparePassword(password)) throw UserException.unauthorizedForId(this.id);

    this.closedAt = new Date();
    this.version = this.version + 1;
  }

  updatePassword(password: string, data: string): void {
    if (!this.comparePassword(password)) throw UserException.unauthorizedForId(this.id);

    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(data, salt);
    this.version = this.version + 1;
  }

  private comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
