import { GetUsersCommand } from './get-users.command';

describe('GetUsersCommand', () => {
  it('should get a GetUsersCommand instance', () => {
    const page = 0;
    const pagesize = 10;
    const command = new GetUsersCommand(page, pagesize);
    expect(command.page).toBe(page);
    expect(command.pagesize).toBe(pagesize);
    expect(command instanceof GetUsersCommand).toBe(true);
  });
});
