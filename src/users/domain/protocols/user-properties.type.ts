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
