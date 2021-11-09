import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { AuthException, JwtPayload } from 'auth/domain';
import { IUserRepository, TUserWithoutPassword } from 'users/domain';
import { JWT_SECRET, USER_REPOSITORY } from 'auth/../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    });
  }

  async validate(payload: JwtPayload): Promise<TUserWithoutPassword> {
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
