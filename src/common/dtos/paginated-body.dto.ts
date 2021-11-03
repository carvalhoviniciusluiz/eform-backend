import { ApiProperty } from '@nestjs/swagger';

export class PaginatedBodyDto<T> {
  @ApiProperty({
    example: 'success'
  })
  status: string;

  @ApiProperty({
    example: []
  })
  rows: T[];
}
