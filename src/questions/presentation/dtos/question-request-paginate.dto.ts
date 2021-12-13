import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { RequestPaginateDto } from 'common';

export class QuestionRequestPaginateDto extends RequestPaginateDto {
  @ApiProperty({
    type: String,
    description: 'The survey id of the question',
    example: '0315ded9-a16a-4930-a25a-231fe963bf57',
    required: true
  })
  @IsNotEmpty()
  @IsUUID()
  readonly surveyid: string;
}
