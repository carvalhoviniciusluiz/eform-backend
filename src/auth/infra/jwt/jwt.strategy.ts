import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'auth/domain';
import { IUserRepository, TUserWithoutPassword } from 'users/domain';
import * as ENV from '../../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ENV.USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ENV.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload): Promise<TUserWithoutPassword> {
    const { email } = payload;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
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
