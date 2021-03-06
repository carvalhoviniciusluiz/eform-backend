import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { IUser, TUserEntity } from 'users/domain';

export class UserModel extends AggregateRoot implements IUser {
  private id?: string;
  private firstname?: string;
  private lastname?: string;
  private documentNumber?: string;
  private email?: string;
  private phone?: string;
  private hasValidate = false;
  private passwordHash?: string;
  private salt?: string;
  private createdAt?: Date | null = null;
  private closedAt?: Date | null = null;
  private version = 0;

  constructor(props: TUserEntity) {
    super();
    Object.assign(this, props);
  }

  props(): TUserEntity {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      documentNumber: this.documentNumber,
      email: this.email,
      phone: this.phone,
      hasValidate: this.hasValidate,
      passwordHash: this.passwordHash,
      salt: this.salt,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      closedAt: this.closedAt,
      version: this.version
    };
  }

  createAccount(password: string): void {
    const hasDocumentNumber = !!this.documentNumber;

    if (!hasDocumentNumber) {
      throw { userId: this.id };
    }

    this.salt = bcrypt.genSaltSync();
    this.passwordHash = bcrypt.hashSync(password, this.salt);

    // TODO:
    // this.apply(Object.assign(new SendEmailConfirmationEvent(), this));
  }

  closeAccount(password: string): void {
    if (!this.comparePassword(password)) {
      throw { userId: this.id };
    }

    this.closedAt = new Date();
    this.version = this.version + 1;
  }

  updatePassword(password: string, newPassword: string): void {
    if (!this.comparePassword(password)) {
      throw { userId: this.id };
    }

    this.salt = bcrypt.genSaltSync();
    this.passwordHash = bcrypt.hashSync(newPassword, this.salt);
    this.version = this.version + 1;
  }

  private comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return this.passwordHash === hash;
  }
}
