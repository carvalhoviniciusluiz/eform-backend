import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
jest.mock('@nestjs/jwt');

import { TokenDecodedCommand, TokenDecodedHandler } from 'auth/application/commands/token-decoded';

describe('TokenDecodedHandler', () => {
  let handler: TokenDecodedHandler;
  let service: JwtService;

  beforeEach(async () => {
    const providers: Provider[] = [TokenDecodedHandler, JwtService];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(TokenDecodedHandler);
    service = testModule.get(JwtService);
  });

  describe('execute', () => {
    it('should execute TokenDecodedCommand', async () => {
      const token = 'token';

      const returnValue = {
        exp: 1
      };

      service.decode = jest.fn().mockReturnValue(returnValue);

      const command = new TokenDecodedCommand(token);

      await expect(handler.execute(command)).resolves.toEqual(returnValue);
      expect(service.decode).toBeCalledTimes(1);
      expect(service.decode).toBeCalledWith(token);
    });
  });
});
