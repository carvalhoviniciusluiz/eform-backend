import { GetAllAnswersQuery } from './get-all-answers.query';

describe('GetAllAnswersQuery', () => {
  it('should get a GetAllAnswersQuery instance', () => {
    const page = 0;
    const pagesize = 10;
    const command = new GetAllAnswersQuery(page, pagesize);
    expect(command.page).toBe(page);
    expect(command.pagesize).toBe(pagesize);
    expect(command instanceof GetAllAnswersQuery).toBe(true);
  });
});
