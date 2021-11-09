import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
jest.mock('@nestjs/jwt');

import { CreateTokenCommand, CreateTokenHandler } from 'auth/application/commands/mutations/create-token';

describe('CreateTokenHandler', () => {
  let handler: CreateTokenHandler;
  let service: JwtService;

  beforeEach(async () => {
    const providers: Provider[] = [CreateTokenHandler, JwtService];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateTokenHandler);
    service = testModule.get(JwtService);
  });

  describe('execute', () => {
    it('should execute CreateTokenCommand', async () => {
      const returnValue = 'xxx';

      const payload = {
        avatar: 'avatar',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email'
      };

      const decoded = {
        exp: 1
      };

      service.sign = jest.fn().mockReturnValue(returnValue);
      service.decode = jest.fn().mockReturnValue(decoded);

      const command = new CreateTokenCommand(payload);

      await expect(handler.execute(command)).resolves.toEqual({
        accessToken: returnValue,
        accessTokenExpiresIn: decoded.exp,
        refreshToken: returnValue,
        refreshTokenExpiresIn: decoded.exp,
        tokenType: 'bearer'
      });
      expect(service.sign).toBeCalledTimes(2);
      expect(service.sign).toBeCalledWith(payload);
    });
  });
});
