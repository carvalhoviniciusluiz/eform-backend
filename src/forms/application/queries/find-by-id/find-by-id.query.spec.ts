import { FindByIdQuery } from './find-by-id.query';

describe('FindByIdQuery', () => {
  it('should get a FindByIdQuery instance', () => {
    const id = '0000';
    const command = new FindByIdQuery(id);
    expect(command.id).toBe(id);
    expect(command instanceof FindByIdQuery).toBe(true);
  });
});
