import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TFormEntity, IForm } from 'forms/domain';

@Injectable()
export class FormService {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  async find(page: number, pagesize: number): Promise<[IForm[], number]> {
    console.log({ page, pagesize });

    return [[], 0];
  }

  async save(props: TFormEntity): Promise<void> {
    console.log(props);
  }

  async update(id: string, props: TFormEntity): Promise<void> {
    console.log(props);
  }
}
