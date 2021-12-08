export type TQuestionEntity = {
  readonly id?: string;
  readonly surveyId?: string;
  readonly content?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly version?: number;
};
