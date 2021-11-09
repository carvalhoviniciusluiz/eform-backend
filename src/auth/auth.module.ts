import { CqrsModule } from '@nestjs/cqrs';
import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  AuthController,
  PasswordGrantStrategy,
  RefreshTokenStrategy,
  CreateCredentialsStrategy
} from 'auth/presentation';
import { AuthService } from 'auth/domain';
import { IStrategyRegistry } from 'common';
import { JwtStrategy } from 'auth/infra';
import { CreateTokenHandler, TokenDecodedHandler, TokenExpiredHandler } from 'auth/application/commands';
import { UserFactory, UserService } from 'users/domain';
import { ValidatePasswordUserHandler } from 'users/application';
import { UserRepository } from 'users/infra';
import {
  AUTH_SERVICE,
  USER_REPOSITORY,
  USER_SERVICE,
  JWT_SECRET,
  JWT_SECRET_EXPIRES_IN,
  STRATEGY_REGISTER,
  AUTH_GRANT_STRATEGY
} from 'auth/../constants';
import { StrategyExplorer, StrategyRegistry } from 'common';

const infrastructure = [
  JwtStrategy,
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }
];
const application = [CreateTokenHandler, TokenDecodedHandler, TokenExpiredHandler, ValidatePasswordUserHandler];
const domain = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService
  },
  {
    provide: USER_SERVICE,
    useClass: UserService
  },
  UserFactory
];
const presentation = [
  StrategyExplorer,
  {
    provide: STRATEGY_REGISTER,
    useClass: StrategyRegistry
  },
  PasswordGrantStrategy,
  RefreshTokenStrategy,
  CreateCredentialsStrategy
];

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }
    }),
    CqrsModule
  ],
  providers: [Logger, ...infrastructure, ...application, ...domain, ...presentation],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule implements OnModuleInit {
  constructor(
    @Inject(STRATEGY_REGISTER)
    private readonly strategyRegistry: IStrategyRegistry,
    private readonly strategyExplorer: StrategyExplorer
  ) {}

  onModuleInit() {
    const { strategies } = this.strategyExplorer.explore(AUTH_GRANT_STRATEGY);
    this.strategyRegistry.register(AUTH_GRANT_STRATEGY, strategies);
  }
}
