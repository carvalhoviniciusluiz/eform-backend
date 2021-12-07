import { ICommand } from '@nestjs/cqrs';
import { TFormEntity } from 'forms/domain';

export class UpdateFormCommand implements ICommand {
  constructor(readonly id: string, readonly props: TFormEntity) {}
}
