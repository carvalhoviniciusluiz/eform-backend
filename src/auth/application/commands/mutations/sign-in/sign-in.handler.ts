import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SignInCommand } from 'auth/application/commands/mutations/sign-in';
import { SignInProps } from 'auth/domain';
import * as ENV from 'auth/../constants';

type DecodedProps = {
  exp: number;
};

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand, SignInProps> {
  constructor(private jwtService: JwtService) {}

  async execute(command: SignInCommand): Promise<SignInProps> {
    const { payload } = command;
    const accessToken = this.jwtService.sign(payload);
    const accessTokenDecoded = this.jwtService.decode(accessToken) as DecodedProps;
    const accessTokenExpiresIn = accessTokenDecoded.exp;

    const refreshTokenOptions: JwtSignOptions = {
      expiresIn: ENV.JWT_SECRET_REFRESHTOKEN_EXPIRES_IN,
      secret: ENV.JWT_SECRET_REFRESHTOKEN
    };

    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);
    const refreshTokenDecoded = this.jwtService.decode(refreshToken) as DecodedProps;
    const refreshTokenExpiresIn = refreshTokenDecoded.exp;

    return {
      accessToken,
      accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresIn,
      tokenType: 'bearer'
    };
  }
}
