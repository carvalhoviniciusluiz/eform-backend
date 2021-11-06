import { SignInCommand } from './sign-in.command';

describe('SignInCommand', () => {
  it('should get a SignInCommand instance', () => {
    const avatar = 'avatar';
    const email = 'email';
    const firstname = 'firstname';
    const lastname = 'lastname';
    const command = new SignInCommand({
      avatar,
      email,
      firstname,
      lastname
    });

    const { payload } = command;

    expect(payload.avatar).toBe(avatar);
    expect(payload.email).toBe(email);
    expect(payload.firstname).toBe(firstname);
    expect(payload.lastname).toBe(lastname);
    expect(command instanceof SignInCommand).toBe(true);
  });
});
