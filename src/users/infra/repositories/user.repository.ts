import { getConnection } from 'typeorm';
import { UserFactory, UserProperties, IUserRepository, IUser } from 'users/domain';
import { UserEntity } from 'users/infra';
import { Inject } from '@nestjs/common';

export class UserRepositoryImplement implements IUserRepository {
  constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) {}

  async getAll(page: number, pagesize: number): Promise<[IUser[], number]> {
    const query = getConnection().createQueryBuilder().select('user').from(UserEntity, 'user');

    if (pagesize) {
      query.take(pagesize).skip(page * pagesize);
    }

    const [users, count] = await query.getManyAndCount();
    const results = users.map(user => this.entityToModel(user));

    return [results, count];
  }

  async save(data: IUser): Promise<void> {
    const entity = this.modelToEntity(data);
    await getConnection().createQueryBuilder().insert().into(UserEntity).values([entity]).execute();
  }

  async update(id: string, data: IUser): Promise<void> {
    const entity = this.modelToEntity(data);
    await getConnection().createQueryBuilder().update(UserEntity).set(entity).where('id = :id', { id }).execute();
  }

  private modelToEntity(model: IUser): UserProperties {
    const properties = Object.entries(model.properties()).filter(([, v]) => v);
    return Object.fromEntries(properties);
  }

  private entityToModel(entity: UserEntity): IUser {
    return this.userFactory.reconstitute({
      ...entity
    });
  }
}
