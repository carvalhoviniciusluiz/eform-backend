import { getConnection } from 'typeorm';
import { UserFactory, TUserEntity, IUserRepository, IUser } from 'users/domain';
import { UserEntity } from 'users/infra';
import { Inject } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) {}

  async find(page = 0, pagesize = 20): Promise<[(null | IUser)[], number]> {
    const query = getConnection().createQueryBuilder().select('user').from(UserEntity, 'user');

    if (pagesize) {
      query.take(pagesize).skip(page * pagesize);
    }

    const [users, count] = await query.getManyAndCount();
    const results = users.map(user => this.entityToModel(user));

    return [results, count];
  }

  async findByDocumentNumber(documentNumber: string): Promise<null | IUser> {
    const row = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.document_number = :documentNumber', { documentNumber })
      .getOne();

    const user = this.entityToModel(row);
    return user;
  }

  async findByCredential(credetial: string): Promise<IUser | null> {
    const row = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.email = :credetial OR user.documentNumber = :credetial', { credetial })
      .getOne();

    const user = this.entityToModel(row);
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const row = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.email = :email', { email })
      .getOne();

    const user = this.entityToModel(row);
    return user;
  }

  async save(data: IUser): Promise<void> {
    const props = this.getUserProps(data);
    await getConnection().createQueryBuilder().insert().into(UserEntity).values([props]).execute();
  }

  async update(id: string, data: IUser): Promise<void> {
    const props = this.getUserProps(data);
    await getConnection().createQueryBuilder().update(UserEntity).set(props).where('id = :id', { id }).execute();
  }

  private getUserProps(model: IUser): TUserEntity {
    const props = Object.entries(model.props()).filter(([, v]) => v);
    return Object.fromEntries(props);
  }

  private entityToModel(entity: UserEntity): IUser | null {
    if (!entity) {
      return null;
    }

    return this.userFactory.reconstitute({
      ...entity
    });
  }
}
