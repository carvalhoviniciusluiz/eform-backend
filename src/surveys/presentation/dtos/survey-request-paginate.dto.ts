import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { RequestPaginateDto } from 'common';

export class SurveyRequestPaginateDto extends RequestPaginateDto {
  @ApiProperty({
    type: String,
    description: 'The form id of the survey',
    example: '0315ded9-a16a-4930-a25a-231fe963bf57',
    required: true
  })
  @IsNotEmpty()
  @IsUUID()
  readonly formid: string;
}
