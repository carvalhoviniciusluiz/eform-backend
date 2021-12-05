import { Test, TestingModule } from '@nestjs/testing';
import { GrantTypeEnum, IAuthService } from 'auth/domain';
import { AuthController } from 'auth/presentation';
import { AUTH_SERVICE } from '../../constants';

describe('AuthController', () => {
  let controller: AuthController;
  let service: IAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AUTH_SERVICE,
          useValue: jest.fn()
        }
      ]
    }).compile();

    service = module.get(AUTH_SERVICE);
    controller = module.get<AuthController>(AuthController);
  });

  describe('run', () => {
    it('should return undefined', async () => {
      const serviceReturnValue = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      };

      const grantType = GrantTypeEnum.password_grant;

      const password = 'password';

      const controllerReturnValue = {
        body: { authorization: { accessToken: 'accessToken', refreshToken: 'refreshToken' }, status: 'success' },
        statusCode: 200
      };

      service.run = jest.fn().mockReturnValue(serviceReturnValue);

      await expect(controller.useStrategy({ grantType, password })).resolves.toEqual(controllerReturnValue);
      expect(service.run).toBeCalledTimes(1);
      expect(service.run).toBeCalledWith(grantType, { password });
    });
  });
});
