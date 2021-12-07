import { GetAllFormsQuery } from './get-all-forms.query';

describe('GetAllFormsQuery', () => {
  it('should get a GetAllFormsQuery instance', () => {
    const page = 0;
    const pagesize = 10;
    const command = new GetAllFormsQuery(page, pagesize);
    expect(command.page).toBe(page);
    expect(command.pagesize).toBe(pagesize);
    expect(command instanceof GetAllFormsQuery).toBe(true);
  });
});
