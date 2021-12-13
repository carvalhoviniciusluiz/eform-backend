import { GetAllQuestionsQuery } from './get-all-questions.query';

describe('GetAllQuestionsQuery', () => {
  it('should get a GetAllQuestionsQuery instance', () => {
    const page = 0;
    const pagesize = 10;
    const surveyId = 'surveyId';
    const command = new GetAllQuestionsQuery(surveyId, page, pagesize);
    expect(command.page).toBe(page);
    expect(command.pagesize).toBe(pagesize);
    expect(command instanceof GetAllQuestionsQuery).toBe(true);
  });
});
