import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultDto } from 'common/dtos';
import { ResponseFormRequestDto } from 'forms/presentation/dtos';

export class PaginatedFormResponseDto extends PaginatedResultDto {
  @ApiProperty({
    example: [
      {
        id: 'aa6c7f2a-7a6c-42f1-abb2-94172a523890',
        name: 'Form1',
        status: 'reviewed',
        consumers: {
          avatars: [
            'https://avatars.githubusercontent.com/u/22005684?v=4',
            {
              char: 'XZ',
              color: '#4fc9da',
              backgroundColor: '#ddf8fc'
            }
          ],
          total: 2
        },
        createdAt: '2021-12-11T17:44:15.212Z',
        updatedAt: '2022-01-12T14:19:24.998Z'
      }
    ]
  })
  data: ResponseFormRequestDto[];

  constructor(rows: any[], count: number, page: number, pageSize: number) {
    super(rows, count, page, pageSize);
    this.data = rows;
  }
}
