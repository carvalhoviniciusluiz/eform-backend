import { TokenExpiredCommand } from './token-expired.command';

describe('TokenExpiredCommand', () => {
  it('should get a TokenExpiredCommand instance', () => {
    const token = 'token';
    const command = new TokenExpiredCommand(token);

    expect(command.token).toBe(token);
    expect(command instanceof TokenExpiredCommand).toBe(true);
  });
});
