import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultDto } from 'common/dtos';
import { ResponseAnswerRequestDto } from 'answers/presentation/dtos';

export class PaginatedAnswerResponseDto extends PaginatedResultDto {
  @ApiProperty({
    example: [
      {
        id: 'ef3cc128-1e82-4ce9-a7f5-8878cd5de40a',
        content: 'Answer1',
        updatedAt: '2021-11-03T02:15:05.623Z'
      }
    ]
  })
  data: ResponseAnswerRequestDto[];

  constructor(rows: any[], count: number, page: number, pageSize: number) {
    super(rows, count, page, pageSize);
    this.data = rows;
  }
}
