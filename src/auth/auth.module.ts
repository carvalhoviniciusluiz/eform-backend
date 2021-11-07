import { CqrsModule } from '@nestjs/cqrs';
import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'auth/presentation';
import { AuthService } from 'auth/domain/auth.service';
import { JwtStrategy } from 'auth/infra';
import { UserFactory, UserService } from 'users/domain';
import { SignInHandler } from 'auth/application/commands';
import { ValidatePasswordUserHandler } from 'users/application';
import { UserRepository } from 'users/infra';
import { USER_REPOSITORY, AUTH_SERVICE, USER_SERVICE, JWT_SECRET, JWT_SECRET_EXPIRES_IN } from 'auth/../constants';

const infrastructure = [
  JwtStrategy,
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }
];
const application = [SignInHandler, ValidatePasswordUserHandler];
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
  providers: [Logger, ...infrastructure, ...application, ...domain],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule {}
