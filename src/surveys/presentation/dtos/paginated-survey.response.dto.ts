import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultDto } from 'common/dtos';
import { ResponseSurveyRequestDto } from 'surveys/presentation/dtos';

export class PaginatedSurveyResponseDto extends PaginatedResultDto {
  @ApiProperty({
    example: [
      {
        id: 'ef3cc128-1e82-4ce9-a7f5-8878cd5de40a',
        name: 'Survey parent',
        children: [
          {
            id: 'c4af6b3c-d7c3-463e-9e58-0472812d462b',
            name: 'Survey child',
            updatedAt: '2021-12-12T19:43:53.232Z'
          }
        ],
        updatedAt: '2021-11-03T02:15:05.623Z'
      }
    ]
  })
  rows: ResponseSurveyRequestDto[];

  constructor(rows: any[], count: number, page: number, pageSize: number) {
    super(rows, count, page, pageSize);
    this.rows = rows;
  }
}
