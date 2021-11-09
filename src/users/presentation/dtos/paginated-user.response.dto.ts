import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultDto, PaginatedBodyDto } from 'common/dtos';
import { ResponseUserRequestDto } from 'users/presentation/dtos';

export class PaginatedUserResponseDto extends PaginatedResultDto {
  @ApiProperty({ example: 200, type: Number })
  statusCode = 200;

  @ApiProperty({
    example: {
      status: 'success',
      rows: [
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
    }
  })
  body: PaginatedBodyDto<ResponseUserRequestDto>;

  constructor(rows: any[], count: number, page: number, pageSize: number) {
    super(rows, count, page, pageSize);

    this.body = {
      status: 'success',
      rows
    };
  }
}
