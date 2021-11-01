import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';

describe('AccountsController', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController]
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('root', () => {
    it('should return "accounts"', () => {
      expect(controller.getAll()).toBe('accounts');
    });
  });
});
