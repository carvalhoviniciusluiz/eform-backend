import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseSignInRequestDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnZhbGhvLmp1bGlhbWFycXVlc0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJKdWxpYSIsImxhc3RuYW1lIjoiTWFycXVlcyIsImF2YXRhciI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8yMjAwNTY4ND92PTQiLCJpYXQiOjE2MzYxNjc3ODksImV4cCI6MTYzNjE2ODA4OX0.pmZEDWaQFfEp2WSvhaencQVxn2YBNYbJquo4qoziD7I'
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnZhbGhvLmp1bGlhbWFycXVlc0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJKdWxpYSIsImxhc3RuYW1lIjoiTWFycXVlcyIsImF2YXRhciI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8yMjAwNTY4ND92PTQiLCJpYXQiOjE2MzYxNjc3ODksImV4cCI6MTYzNjc3MjU4OX0.Kh4GOsjkyoN9Wogi2wWHA3HMzlWhO822ohr2MgjWBI0'
  })
  @Expose()
  refreshToken: string;
}
