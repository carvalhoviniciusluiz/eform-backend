import { AddSurveyChildCommand } from './add-survey-child.command';

describe('AddSurveyChildCommand', () => {
  it('should create a AddSurveyChildCommand instance', () => {
    const command = new AddSurveyChildCommand({
      formId: 'formId',
      parentId: 'parentId',
      name: 'name'
    });
    expect(command.props.formId).toBe('formId');
    expect(command.props.parentId).toBe('parentId');
    expect(command.props.name).toBe('name');
    expect(command instanceof AddSurveyChildCommand).toBe(true);
  });
});
