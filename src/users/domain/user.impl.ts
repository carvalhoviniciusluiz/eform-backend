import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UserException } from 'users/domain';
import { IUser, UserProperties } from 'users/domain/protocols';

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
    const hasDocumentNumber = !!this.documentNumber;

    if (!hasDocumentNumber) throw UserException.canNotCreateUser(this.id);

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
