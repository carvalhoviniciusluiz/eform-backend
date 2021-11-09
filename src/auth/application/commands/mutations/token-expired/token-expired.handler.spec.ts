import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
jest.mock('@nestjs/jwt');

import { TokenExpiredCommand, TokenExpiredHandler } from 'auth/application/commands/mutations/token-expired';

describe('TokenExpiredHandler', () => {
  let handler: TokenExpiredHandler;
  let service: JwtService;

  beforeEach(async () => {
    const providers: Provider[] = [TokenExpiredHandler, JwtService];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(TokenExpiredHandler);
    service = testModule.get(JwtService);
  });

  describe('execute', () => {
    it('should execute TokenExpiredCommand', async () => {
      service.verify = jest.fn().mockReturnValue(false);

      const token = 'token';
      const command = new TokenExpiredCommand(token);

      await expect(handler.execute(command)).resolves.toEqual(false);
      expect(service.verify).toBeCalledTimes(1);
      expect(service.verify).toBeCalledWith(token);
    });
  });
});
