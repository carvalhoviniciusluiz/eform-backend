import { FindUsersQuery } from './find-users.query';

describe('FindUsersQuery', () => {
  it('should get a FindUsersQuery instance', () => {
    const page = 0;
    const pagesize = 10;
    const command = new FindUsersQuery(page, pagesize);
    expect(command.page).toBe(page);
    expect(command.pagesize).toBe(pagesize);
    expect(command instanceof FindUsersQuery).toBe(true);
  });
});
