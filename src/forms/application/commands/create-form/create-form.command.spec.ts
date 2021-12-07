import { CreateFormCommand } from './create-form.command';
import { v4 as uuid } from 'uuid';

describe('CreateFormCommand', () => {
  it('should create a CreateFormCommand instance', () => {
    const id = uuid();
    const command = new CreateFormCommand({ id });
    expect(command.props.id).toBe(id);
    expect(command instanceof CreateFormCommand).toBe(true);
  });
});
