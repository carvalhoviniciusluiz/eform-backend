import { getConnection } from 'typeorm';
import { QuestionFactory, TQuestionEntity, IQuestionRepository, IQuestion } from 'questions/domain';
import { QuestionEntity } from 'questions/infra';
import { Inject } from '@nestjs/common';

export class QuestionRepository implements IQuestionRepository {
  constructor(@Inject(QuestionFactory) private readonly questionFactory: QuestionFactory) {}

  async find(page = 0, pagesize = 20): Promise<[(null | IQuestion)[], number]> {
    const query = getConnection().createQueryBuilder().select('question').from(QuestionEntity, 'question');

    if (pagesize) {
      query.take(pagesize).skip(page * pagesize);
    }

    const [questions, count] = await query.getManyAndCount();
    const results = questions.map(question => this.entityToModel(question));

    return [results, count];
  }

  async save(data: IQuestion): Promise<Date | null> {
    const props = this.getQuestionProps(data);
    const row = await getConnection().createQueryBuilder().insert().into(QuestionEntity).values([props]).execute();
    const question = row?.raw[0];
    return question?.created_at;
  }

  async findByContent(surveyId: string, content: string): Promise<null | IQuestion> {
    if (!surveyId || !content) return;

    const query = getConnection().createQueryBuilder().select('question').from(QuestionEntity, 'question');
    query.where('question.survey_id = :surveyId AND question.content = :content', {
      surveyId,
      content
    });

    const question = await query.getOne();
    return this.entityToModel(question);
  }

  async update(id: string, data: IQuestion): Promise<Date | null> {
    const props = this.getQuestionProps(data);
    const row = await getConnection()
      .createQueryBuilder()
      .update(QuestionEntity)
      .set(props)
      .where('id = :id', { id })
      .execute();
    const question = row?.raw[0];
    return question?.updated_at;
  }

  private getQuestionProps(model: IQuestion): TQuestionEntity {
    const props = Object.entries(model.props()).filter(([, v]) => v);
    return Object.fromEntries(props);
  }

  private entityToModel(entity: QuestionEntity): IQuestion | null {
    if (!entity) {
      return null;
    }

    return this.questionFactory.reconstitute({
      ...entity
    });
  }
}
