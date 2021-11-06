import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { AuthException, JwtPayload } from 'auth/domain';
import { IUserRepository } from 'users/domain';
import { InjectionConstant } from 'users/injection.constant';
import * as ENV from 'auth/../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(InjectionConstant.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ENV.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw AuthException.unauthorized();
    }

    const { id, firstname, lastname, documentNumber, phone, hasValidate, createdAt, updatedAt, closedAt, version } =
      user.props();

    return {
      id,
      firstname,
      lastname,
      documentNumber,
      email,
      phone,
      hasValidate,
      createdAt,
      updatedAt,
      closedAt,
      version
    };
  }
}
