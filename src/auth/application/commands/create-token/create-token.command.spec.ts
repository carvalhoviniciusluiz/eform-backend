import { CreateTokenCommand } from './create-token.command';

describe('CreateTokenCommand', () => {
  it('should get a CreateTokenCommand instance', () => {
    const avatar = 'avatar';
    const email = 'email';
    const firstname = 'firstname';
    const lastname = 'lastname';
    const command = new CreateTokenCommand({
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
    expect(command instanceof CreateTokenCommand).toBe(true);
  });
});
