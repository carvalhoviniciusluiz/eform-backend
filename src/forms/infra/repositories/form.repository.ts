import { getConnection } from 'typeorm';
import { FormFactory, TFormEntity, IFormRepository, IForm } from 'forms/domain';
import { FormEntity } from 'forms/infra';
import { Inject } from '@nestjs/common';

export class FormRepository implements IFormRepository {
  constructor(@Inject(FormFactory) private readonly formFactory: FormFactory) {}

  async find(page = 0, pagesize = 20): Promise<[(null | IForm)[], number]> {
    const query = getConnection()
      .createQueryBuilder()
      .select('form')
      .from(FormEntity, 'form')
      .leftJoinAndSelect('form.consumers', 'consumer');

    if (pagesize) {
      query.take(pagesize).skip(page * pagesize);
    }

    const [forms, count] = await query.getManyAndCount();
    const results = forms.map(form => this.entityToModel(form));

    return [results, count];
  }

  async findById(id: string): Promise<null | IForm> {
    if (!id) return;

    const query = getConnection().createQueryBuilder().select('form').from(FormEntity, 'form');
    query.where('form.id = :id', {
      id
    });

    const form = await query.getOne();
    return this.entityToModel(form);
  }

  async findByName(name: string): Promise<null | IForm> {
    if (!name) return;

    const query = getConnection().createQueryBuilder().select('form').from(FormEntity, 'form');
    query.where('form.name = :name', {
      name
    });

    const form = await query.getOne();
    return this.entityToModel(form);
  }

  async save(data: IForm): Promise<Date | null> {
    const props = this.getFormProps(data);
    const row = await getConnection().createQueryBuilder().insert().into(FormEntity).values([props]).execute();
    const form = row?.raw[0];
    return form?.created_at;
  }

  async update(id: string, data: IForm): Promise<Date | null> {
    const props = this.getFormProps(data);
    const row = await getConnection()
      .createQueryBuilder()
      .update(FormEntity)
      .set(props)
      .where('id = :id', { id })
      .execute();
    const form = row?.raw[0];
    return form?.updated_at;
  }

  private getFormProps(model: IForm): TFormEntity {
    const props = Object.entries(model.props()).filter(([, v]) => v);
    return Object.fromEntries(props);
  }

  private entityToModel(entity: FormEntity): IForm | null {
    if (!entity) {
      return null;
    }

    return this.formFactory.reconstitute({
      ...entity
    });
  }
}
