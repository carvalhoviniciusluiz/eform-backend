import { getConnection } from 'typeorm';
import { AnswerFactory, TAnswerEntity, IAnswerRepository, IAnswer } from 'answers/domain';
import { AnswerEntity } from 'answers/infra';
import { Inject } from '@nestjs/common';

export class AnswerRepository implements IAnswerRepository {
  constructor(@Inject(AnswerFactory) private readonly answerFactory: AnswerFactory) {}

  async find(page = 0, pagesize = 20): Promise<[(null | IAnswer)[], number]> {
    const query = getConnection().createQueryBuilder().select('answer').from(AnswerEntity, 'answer');

    if (pagesize) {
      query.take(pagesize).skip(page * pagesize);
    }

    const [answers, count] = await query.getManyAndCount();
    const results = answers.map(answer => this.entityToModel(answer));

    return [results, count];
  }

  async save(data: IAnswer): Promise<Date | null> {
    const props = this.getAnswerProps(data);
    const row = await getConnection().createQueryBuilder().insert().into(AnswerEntity).values([props]).execute();
    const answer = row?.raw[0];
    return answer?.created_at;
  }

  async update(id: string, data: IAnswer): Promise<Date | null> {
    const props = this.getAnswerProps(data);
    const row = await getConnection()
      .createQueryBuilder()
      .update(AnswerEntity)
      .set(props)
      .where('id = :id', { id })
      .execute();
    const answer = row?.raw[0];
    return answer?.updated_at;
  }

  private getAnswerProps(model: IAnswer): TAnswerEntity {
    const props = Object.entries(model.props()).filter(([, v]) => v);
    return Object.fromEntries(props);
  }

  private entityToModel(entity: AnswerEntity): IAnswer | null {
    if (!entity) {
      return null;
    }

    return this.answerFactory.reconstitute({
      ...entity
    });
  }
}
