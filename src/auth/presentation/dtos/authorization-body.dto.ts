import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationBodyDto<T> {
  @ApiProperty({
    example: 'success'
  })
  status: string;

  @ApiProperty({
    example: {
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnZhbGhvLnZpbmljaXVzbHVpekBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJWaW7DrWNpdXNzc3NzcyIsImxhc3RuYW1lIjoiQ2FydmFsaG9vb29vIiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzIyMDA1Njg0P3Y9NCIsImlhdCI6MTYzNjQyNTQ0NCwiZXhwIjoxNjM3MDMwMjQ0fQ.fFj4bBSBSey1UW3zbVaW_5ds7GDt1ewlFxeLT-J-mPo',
      refreshTokenExpiresIn: 1637030244,
      tokenType: 'bearer'
    }
  })
  authorization: T;
}
