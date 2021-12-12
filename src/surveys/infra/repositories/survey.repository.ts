import { getConnection } from 'typeorm';
import { SurveyFactory, TSurveyEntity, ISurveyRepository, ISurvey } from 'surveys/domain';
import { SurveyEntity } from 'surveys/infra';
import { Inject } from '@nestjs/common';

export class SurveyRepository implements ISurveyRepository {
  constructor(@Inject(SurveyFactory) private readonly surveyFactory: SurveyFactory) {}

  async find(formId: string, page = 0, pagesize = 20): Promise<[(null | ISurvey)[], number]> {
    const query = getConnection()
      .createQueryBuilder()
      .select('survey')
      .from(SurveyEntity, 'survey')
      .innerJoinAndSelect('survey.form', 'form')
      .leftJoinAndSelect('survey.children', 'children')
      .where('survey.parent_id IS NULL');

    query.andWhere('survey.form_id = :formId', {
      formId
    });

    if (pagesize) {
      query.take(pagesize).skip(page * pagesize);
    }

    const [surveys, count] = await query.getManyAndCount();

    const results = surveys.map(survey => this.entityToModel(survey));

    return [results, count];
  }

  async findById(id: string): Promise<null | ISurvey> {
    if (!id) return;

    const query = getConnection().createQueryBuilder().select('survey').from(SurveyEntity, 'survey');
    query.where('survey.id = :id', {
      id
    });

    const survey = await query.getOne();
    return this.entityToModel(survey);
  }

  async findByName(name: string): Promise<null | ISurvey> {
    if (!name) return;

    const query = getConnection().createQueryBuilder().select('survey').from(SurveyEntity, 'survey');
    query.where('survey.name = :name', {
      name
    });

    const survey = await query.getOne();
    return this.entityToModel(survey);
  }

  async save(data: ISurvey): Promise<Date | null> {
    const props = this.getSurveyProps(data);
    const row = await getConnection().createQueryBuilder().insert().into(SurveyEntity).values([props]).execute();
    const survey = row?.raw[0];
    return survey?.created_at;
  }

  async update(id: string, data: ISurvey): Promise<Date | null> {
    const props = this.getSurveyProps(data);
    const row = await getConnection()
      .createQueryBuilder()
      .update(SurveyEntity)
      .set(props)
      .where('id = :id', { id })
      .execute();
    const survey = row?.raw[0];
    return survey?.updated_at;
  }

  private getSurveyProps(model: ISurvey): TSurveyEntity {
    const props = Object.entries(model.props()).filter(([, v]) => v);
    return Object.fromEntries(props);
  }

  private entityToModel(entity: SurveyEntity): ISurvey | null {
    if (!entity) {
      return null;
    }

    return this.surveyFactory.reconstitute({
      ...entity
    });
  }
}
