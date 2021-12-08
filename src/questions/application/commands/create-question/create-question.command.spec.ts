import { CreateQuestionCommand } from './create-question.command';

describe('CreateQuestionCommand', () => {
  it('should create a CreateQuestionCommand instance', () => {
    const command = new CreateQuestionCommand({ surveyId: 'surveyId', content: 'content' });
    expect(command.props.surveyId).toBe('surveyId');
    expect(command.props.content).toBe('content');
    expect(command instanceof CreateQuestionCommand).toBe(true);
  });
});
