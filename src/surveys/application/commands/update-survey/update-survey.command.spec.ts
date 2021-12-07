import { UpdateSurveyCommand } from './update-survey.command';
import { v4 as uuid } from 'uuid';

describe('UpdateSurveyCommand', () => {
  it('should update a UpdateSurveyCommand instance', () => {
    const id = uuid();
    const command = new UpdateSurveyCommand(id, { formId: 'formId', name: 'name' });
    expect(command.id).toBe(id);
    expect(command.props.formId).toBe('formId');
    expect(command.props.name).toBe('name');
    expect(command instanceof UpdateSurveyCommand).toBe(true);
  });
});
