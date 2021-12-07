import { ICommand } from '@nestjs/cqrs';
import { TFormEntity } from 'forms/domain';

export class CreateFormCommand implements ICommand {
  constructor(readonly props: TFormEntity) {}
}
