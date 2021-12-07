import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFormCommand, GetAllFormsQuery, UpdateFormCommand } from 'forms/application';
import { TFormEntity, IForm } from 'forms/domain';
import { TUser } from 'users/domain';

@Injectable()
export class FormService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IForm[], number]> {
    const query = new GetAllFormsQuery(page, pagesize);
    return this.queryBus.execute<GetAllFormsQuery, [IForm[], number]>(query);
  }

  async save(props: TUser): Promise<void> {
    const command = new CreateFormCommand(props);
    return this.commandBus.execute(command);
  }

  async update(id: string, props: TFormEntity): Promise<void> {
    const command = new UpdateFormCommand(id, props);
    return this.commandBus.execute(command);
  }
}
