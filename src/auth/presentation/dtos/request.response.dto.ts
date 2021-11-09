import { ApiProperty } from '@nestjs/swagger';
import { AuthorizationBodyDto, AuthResponseDto } from 'auth/presentation/dtos';

export class RequestResponseDto {
  @ApiProperty({ example: 200, type: Number })
  statusCode = 200;

  @ApiProperty({
    example: {
      status: 'success',
      authorization: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnZhbGhvLnZpbmljaXVzbHVpekBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJWaW7DrWNpdXNzc3NzcyIsImxhc3RuYW1lIjoiQ2FydmFsaG9vb29vIiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzIyMDA1Njg0P3Y9NCIsImlhdCI6MTYzNjQyNTE1OSwiZXhwIjoxNjM2NDI1NDU5fQ.fDqwOMSqH6HbiKvgf6ofoPe4cuZt2Fvctnt81oiLYl4',
        accessTokenExpiresIn: 1636425459,
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnZhbGhvLnZpbmljaXVzbHVpekBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJWaW7DrWNpdXNzc3NzcyIsImxhc3RuYW1lIjoiQ2FydmFsaG9vb29vIiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzIyMDA1Njg0P3Y9NCIsImlhdCI6MTYzNjQyNTE1OSwiZXhwIjoxNjM3MDI5OTU5fQ.6_BwOoq3VbkHA-6IVmo4ePD_TFRPWfv_q8T8EAy36TM',
        refreshTokenExpiresIn: 1637029959,
        tokenType: 'bearer'
      }
    }
  })
  body: AuthorizationBodyDto<AuthResponseDto>;

  constructor(authorization: any) {
    this.body = {
      status: 'success',
      authorization
    };
  }
}
