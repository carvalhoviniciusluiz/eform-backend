import { ValidatePasswordUserCommand } from './validate-password-user.command';

describe('ValidatePasswordUserCommand', () => {
  it('should create a ValidatePasswordUserCommand instance', () => {
    const credential = 'credential';
    const password = 'password';
    const command = new ValidatePasswordUserCommand(credential, password);
    expect(command.credential).toBe(credential);
    expect(command.password).toBe(password);
    expect(command instanceof ValidatePasswordUserCommand).toBe(true);
  });
});
