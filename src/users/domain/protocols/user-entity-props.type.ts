export type TUserEntityProps = {
  readonly id?: string;
  readonly firstname?: string;
  readonly documentNumber?: string;
  readonly lastname?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly hasValidate?: boolean;
  readonly passwordHash?: string;
  readonly salt?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly closedAt?: Date | null;
  readonly version?: number;
};
