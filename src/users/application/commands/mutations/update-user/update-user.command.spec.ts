import { UpdateUserCommand } from './update-user.command';
import { v4 as uuid } from 'uuid';

describe('UpdateUserCommand', () => {
  it('should update a UpdateUserCommand instance', () => {
    const id = uuid();
    const command = new UpdateUserCommand(id, { id });
    expect(command.id).toBe(id);
    expect(command.aproperties.id).toBe(id);
    expect(command instanceof UpdateUserCommand).toBe(true);
  });
});
