import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IAuthService } from 'auth/domain';
import { AuthBodyDto, RequestResponseDto } from 'auth/presentation/dtos';
import { AuthException } from 'auth/presentation/exceptions';
import { AUTH_SERVICE } from 'auth/../constants';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService
  ) {}

  @ApiOkResponse({ type: RequestResponseDto })
  @Post()
  async useStrategy(
    @Body()
    body: AuthBodyDto
  ): Promise<RequestResponseDto> {
    const { grantType, ...props } = body;
    try {
      const rows = await this.authService.run(grantType, props);
      return new RequestResponseDto(rows);
    } catch (error) {
      if (error.grant_type) {
        throw AuthException.strategyNotFound(error.grant_type);
      }
      if (error.expired) {
        throw AuthException.unauthorized('token expired');
      }
      if (error.unauthorized) {
        throw AuthException.unauthorized();
      }
    }
  }
}
