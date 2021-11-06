import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SignInCommand } from 'auth/application/commands/mutations/sign-in';
import { SignInProps } from 'auth/domain';
import * as ENV from 'auth/../constants';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand, SignInProps> {
  constructor(private jwtService: JwtService) {}

  async execute(command: SignInCommand): Promise<SignInProps> {
    const { payload } = command;
    const accessToken = this.jwtService.sign(payload);

    const refreshTokenOptions: JwtSignOptions = {
      expiresIn: ENV.JWT_SECRET_REFRESHTOKEN_EXPIRES_IN,
      secret: ENV.JWT_SECRET_REFRESHTOKEN
    };

    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);

    return {
      accessToken,
      refreshToken
    };
  }
}
