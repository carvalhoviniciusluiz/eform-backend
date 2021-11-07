import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from 'auth/domain';
import { AuthController } from 'auth/presentation';
import { AUTH_SERVICE } from 'users/../constants';

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

  describe('signUp', () => {
    it('should return undefined', async () => {
      const returnValue = {
        credential: 'credential',
        password: 'password'
      };

      service.signIn = jest.fn().mockReturnValue(undefined);

      await expect(controller.signIn(returnValue)).resolves.toBeUndefined();
      expect(service.signIn).toBeCalledTimes(1);
      expect(service.signIn).toBeCalledWith(returnValue.credential, returnValue.password);
    });
  });
});
