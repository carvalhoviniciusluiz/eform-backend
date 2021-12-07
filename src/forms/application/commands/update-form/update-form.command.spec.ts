import { UpdateFormCommand } from './update-form.command';
import { v4 as uuid } from 'uuid';

describe('UpdateFormCommand', () => {
  it('should update a UpdateFormCommand instance', () => {
    const id = uuid();
    const command = new UpdateFormCommand(id, { id });
    expect(command.id).toBe(id);
    expect(command.props.id).toBe(id);
    expect(command instanceof UpdateFormCommand).toBe(true);
  });
});
