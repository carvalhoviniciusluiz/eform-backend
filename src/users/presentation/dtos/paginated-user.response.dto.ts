import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultDto } from 'common/dtos';
import { ResponseUserRequestDto } from 'users/presentation/dtos';

export class PaginatedUserResponseDto extends PaginatedResultDto {
  @ApiProperty({
    example: [
      {
        id: 'ef3cc128-1e82-4ce9-a7f5-8878cd5de40a',
        firstname: 'Vinícius',
        lastname: 'Carvalho',
        document: {
          number: null
        },
        email: 'carvalho.viniciusluiz@gmail.com',
        phone: '6981186382',
        updatedAt: '2021-11-03T02:15:05.623Z'
      }
    ]
  })
  data: ResponseUserRequestDto[];

  constructor(rows: any[], count: number, page: number, pageSize: number) {
    super(rows, count, page, pageSize);
    this.data = rows;
  }
}
