import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'auth/domain';
import { AuthController } from 'auth/presentation';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: jest.fn()
        }
      ]
    }).compile();

    service = module.get(AuthService);
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
