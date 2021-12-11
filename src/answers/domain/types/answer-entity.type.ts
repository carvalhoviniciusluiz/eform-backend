export type TAnswerEntity = {
  readonly id?: string;
  readonly questionId?: string;
  readonly content?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly version?: number;
};
