import { UpdateQuestionCommand } from './update-question.command';
import { v4 as uuid } from 'uuid';

describe('UpdateQuestionCommand', () => {
  it('should update a UpdateQuestionCommand instance', () => {
    const id = uuid();
    const command = new UpdateQuestionCommand(id, { surveyId: 'surveyId', content: 'content' });
    expect(command.id).toBe(id);
    expect(command.props.surveyId).toBe('surveyId');
    expect(command.props.content).toBe('content');
    expect(command instanceof UpdateQuestionCommand).toBe(true);
  });
});
