import { TokenDecodedCommand } from './token-decoded.command';

describe('TokenDecodedCommand', () => {
  it('should get a TokenDecodedCommand instance', () => {
    const token = 'token';
    const command = new TokenDecodedCommand(token);

    expect(command.token).toBe(token);
    expect(command instanceof TokenDecodedCommand).toBe(true);
  });
});
