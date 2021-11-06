import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'auth/domain';
import { ResponseSignInRequestDto, SignUpBodyDTO, SingInBodyDto } from 'auth/presentation/dtos';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: ResponseSignInRequestDto })
  @Post('/signin')
  async signIn(
    @Body(new ValidationPipe({ transform: true }))
    body: SingInBodyDto
  ): Promise<ResponseSignInRequestDto> {
    const { credential, password } = body;
    return this.authService.signIn(credential, password);
  }

  @Post('/signup')
  async signUp(
    @Body(new ValidationPipe({ transform: true }))
    body: SignUpBodyDTO
  ): Promise<void> {
    console.log(body);
  }
}
