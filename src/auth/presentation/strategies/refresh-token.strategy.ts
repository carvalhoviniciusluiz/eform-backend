import { IGrantStrategy } from 'common';
import { AuthGrantStrategy } from 'auth/presentation';
import { CommandBus } from '@nestjs/cqrs';
import { TokenExpiredCommand, TokenDecodedCommand, CreateTokenCommand } from 'auth/application';
import { AuthException } from 'auth/domain';

type TRequest = {
  refreshToken: string;
};

type TResponse = {
  refreshToken: string;
  refreshTokenExpiresIn: number;
  tokenType: string;
};

type TDecoded = {
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
};

type TToken = {
  refreshToken: string;
  refreshTokenExpiresIn: number;
  tokenType: string;
};

@AuthGrantStrategy('refresh_token')
export class RefreshTokenStrategy implements IGrantStrategy {
  constructor(private commandBus: CommandBus) {}

  private async throwExceptionIfTokenExpired(refreshToken: string) {
    const command = new TokenExpiredCommand(refreshToken);
    const isExpired = await this.commandBus.execute(command);

    if (isExpired) {
      throw AuthException.unauthorized('token expired');
    }
  }

  private async tokenDecoded(refreshToken: string): Promise<TDecoded> {
    const command = new TokenDecodedCommand(refreshToken);
    return this.commandBus.execute<TokenDecodedCommand, TDecoded>(command);
  }

  async run(data: TRequest): Promise<TResponse> {
    const { refreshToken } = data;
    await this.throwExceptionIfTokenExpired(refreshToken);

    const decoded = await this.tokenDecoded(refreshToken);

    const command = new CreateTokenCommand({
      email: decoded.email,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
      avatar: decoded.avatar
    });

    const token = await this.commandBus.execute<CreateTokenCommand, TToken>(command);
    return {
      refreshToken: token.refreshToken,
      refreshTokenExpiresIn: token.refreshTokenExpiresIn,
      tokenType: token.tokenType
    };
  }
}
