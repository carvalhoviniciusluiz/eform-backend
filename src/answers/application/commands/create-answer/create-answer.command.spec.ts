import { CreateAnswerCommand } from './create-answer.command';

describe('CreateAnswerCommand', () => {
  it('should create a CreateAnswerCommand instance', () => {
    const command = new CreateAnswerCommand({ questionId: 'questionId', content: 'content' });
    expect(command.props.questionId).toBe('questionId');
    expect(command.props.content).toBe('content');
    expect(command instanceof CreateAnswerCommand).toBe(true);
  });
});
