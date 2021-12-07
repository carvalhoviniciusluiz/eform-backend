import { CreateSurveyCommand } from './create-survey.command';

describe('CreateSurveyCommand', () => {
  it('should create a CreateSurveyCommand instance', () => {
    const command = new CreateSurveyCommand({ formId: 'formId', name: 'name' });
    expect(command.props.formId).toBe('formId');
    expect(command.props.name).toBe('name');
    expect(command instanceof CreateSurveyCommand).toBe(true);
  });
});
