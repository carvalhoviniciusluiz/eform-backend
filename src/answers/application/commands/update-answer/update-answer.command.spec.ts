import { UpdateAnswerCommand } from './update-answer.command';
import { v4 as uuid } from 'uuid';

describe('UpdateAnswerCommand', () => {
  it('should update a UpdateAnswerCommand instance', () => {
    const id = uuid();
    const command = new UpdateAnswerCommand(id, { questionId: 'questionId', content: 'content' });
    expect(command.id).toBe(id);
    expect(command.props.questionId).toBe('questionId');
    expect(command.props.content).toBe('content');
    expect(command instanceof UpdateAnswerCommand).toBe(true);
  });
});
