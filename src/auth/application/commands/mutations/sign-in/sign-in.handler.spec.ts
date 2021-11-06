import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
jest.mock('@nestjs/jwt');

import { SignInCommand, SignInHandler } from 'auth/application/commands/mutations/sign-in';

describe('SignInHandler', () => {
  let handler: SignInHandler;
  let service: JwtService;

  beforeEach(async () => {
    const providers: Provider[] = [SignInHandler, JwtService];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(SignInHandler);
    service = testModule.get(JwtService);
  });

  describe('execute', () => {
    it('should execute SignInCommand', async () => {
      const returnSignInValue = 'xxx';

      const payload = {
        avatar: 'avatar',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email'
      };

      const returnDecodeValue = {
        exp: 1
      };

      service.sign = jest.fn().mockReturnValue(returnSignInValue);
      service.decode = jest.fn().mockReturnValue(returnDecodeValue);

      const command = new SignInCommand(payload);

      await expect(handler.execute(command)).resolves.toEqual({
        accessToken: returnSignInValue,
        accessTokenExpiresIn: returnDecodeValue.exp,
        refreshToken: returnSignInValue,
        refreshTokenExpiresIn: returnDecodeValue.exp,
        tokenType: 'bearer'
      });
      expect(service.sign).toBeCalledTimes(2);
      expect(service.sign).toBeCalledWith(payload);
    });
  });
});
