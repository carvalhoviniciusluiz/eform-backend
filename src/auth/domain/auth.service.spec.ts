import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { AuthService } from 'auth/domain';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();
    service = module.get(AuthService);
  });

  describe('signIn', () => {
    it('should return accesstoken and refreshtoken', async () => {
      const returnValue = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      };

      const credential = 'credential';
      const password = 'password';

      service.signIn = jest.fn().mockReturnValue(returnValue);

      expect(await service.signIn(credential, password)).toEqual(returnValue);
      expect(service.signIn).toBeCalledTimes(1);
      expect(service.signIn).toBeCalledWith(credential, password);
    });
  });
});
