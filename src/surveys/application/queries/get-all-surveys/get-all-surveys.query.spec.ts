import { GetAllSurveysQuery } from './get-all-surveys.query';

describe('GetAllSurveysQuery', () => {
  it('should get a GetAllSurveysQuery instance', () => {
    const page = 0;
    const pagesize = 10;
    const command = new GetAllSurveysQuery(page, pagesize);
    expect(command.page).toBe(page);
    expect(command.pagesize).toBe(pagesize);
    expect(command instanceof GetAllSurveysQuery).toBe(true);
  });
});
