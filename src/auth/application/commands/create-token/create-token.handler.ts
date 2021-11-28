import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateTokenCommand } from 'auth/application/commands/create-token';
import { TCreateToken } from 'auth/domain';
import * as ENV from 'auth/../constants';

type TDecoded = {
  exp: number;
};

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand, TCreateToken> {
  constructor(private jwtService: JwtService) {}

  async execute(command: CreateTokenCommand): Promise<TCreateToken> {
    const { payload } = command;
    const accessToken = this.jwtService.sign(payload);
    const accessTokenDecoded = this.jwtService.decode(accessToken) as TDecoded;
    const accessTokenExpiresIn = accessTokenDecoded.exp;

    const refreshTokenOptions: JwtSignOptions = {
      expiresIn: ENV.JWT_SECRET_REFRESHTOKEN_EXPIRES_IN,
      secret: ENV.JWT_SECRET_REFRESHTOKEN
    };

    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);
    const refreshTokenDecoded = this.jwtService.decode(refreshToken) as TDecoded;
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
