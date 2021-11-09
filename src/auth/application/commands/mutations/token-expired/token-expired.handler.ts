import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenExpiredCommand } from 'auth/application/commands/mutations/token-expired';
import { JWT_SECRET_REFRESHTOKEN_EXPIRES_IN, JWT_SECRET_REFRESHTOKEN } from 'auth/../constants';

@CommandHandler(TokenExpiredCommand)
export class TokenExpiredHandler implements ICommandHandler<TokenExpiredCommand, boolean> {
  constructor(private jwtService: JwtService) {}

  async execute(command: TokenExpiredCommand): Promise<boolean> {
    const { token } = command;

    const tokenOptions: JwtSignOptions = {
      expiresIn: JWT_SECRET_REFRESHTOKEN_EXPIRES_IN,
      secret: JWT_SECRET_REFRESHTOKEN
    };

    try {
      await this.jwtService.verify(token, tokenOptions);
      return false;
    } catch (err) {
      return true;
    }
  }
}
