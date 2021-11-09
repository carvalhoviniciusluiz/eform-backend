import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IAuthService } from 'auth/domain';
import { AuthBodyDto, RequestResponseDto } from 'auth/presentation/dtos';
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

    const rows = await this.authService.run(grantType, props);
    return new RequestResponseDto(rows);
  }
}
