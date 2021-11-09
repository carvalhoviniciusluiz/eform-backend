import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { TokenDecodedCommand } from 'auth/application/commands/mutations/token-decoded';
import { JwtPayload } from 'auth/domain';

type TDecoded = JwtPayload & {
  exp: number;
};

@CommandHandler(TokenDecodedCommand)
export class TokenDecodedHandler implements ICommandHandler<TokenDecodedCommand, JwtPayload> {
  constructor(private jwtService: JwtService) {}

  async execute(command: TokenDecodedCommand): Promise<JwtPayload> {
    const { token } = command;
    const decoded = this.jwtService.decode(token) as TDecoded;

    return decoded;
  }
}
