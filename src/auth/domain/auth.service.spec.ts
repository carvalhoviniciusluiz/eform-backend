import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { AuthService, GrantTypeEnum } from 'auth/domain';
import { STRATEGY_REGISTER } from 'auth/../constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: CommandBus,
          useValue: jest.fn()
        },
        {
          provide: STRATEGY_REGISTER,
          useValue: jest.fn()
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

      const grantType = GrantTypeEnum.password_grant;
      const paramsValue = {
        credential: 'credential',
        password: 'password'
      };

      service.run = jest.fn().mockReturnValue(returnValue);

      expect(await service.run(grantType, paramsValue)).toEqual(returnValue);
      expect(service.run).toBeCalledTimes(1);
      expect(service.run).toBeCalledWith(grantType, paramsValue);
    });
  });
});
