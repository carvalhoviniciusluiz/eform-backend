import { CreateUserCommand } from './create-user.command';
import { v4 as uuid } from 'uuid';

describe('CreateUserCommand', () => {
  it('should create a CreateUserCommand instance', () => {
    const id = uuid();
    const command = new CreateUserCommand({ id });
    expect(command.aproperties.id).toBe(id);
    expect(command instanceof CreateUserCommand).toBe(true);
  });
});
