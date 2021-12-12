import { GetAllSurveysQuery } from './get-all-surveys.query';

describe('GetAllSurveysQuery', () => {
  it('should get a GetAllSurveysQuery instance', () => {
    const page = 0;
    const pagesize = 10;
    const formid = 'formid';
    const command = new GetAllSurveysQuery(formid, page, pagesize);
    expect(command.formId).toBe(formid);
    expect(command.page).toBe(page);
    expect(command.pagesize).toBe(pagesize);
    expect(command instanceof GetAllSurveysQuery).toBe(true);
  });
});
