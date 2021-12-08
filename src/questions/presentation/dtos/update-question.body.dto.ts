import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateQuestionBodyDTO {
  @ApiProperty({
    type: String,
    description: 'The survey id of the question',
    example: '0315ded9-a16a-4930-a25a-231fe963bf57',
    required: true
  })
  @IsOptional()
  @IsUUID()
  readonly surveyId: string;

  @ApiProperty({
    type: String,
    description: 'The content of the question',
    minLength: 2,
    maxLength: 999,
    example: 'Question test'
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(999)
  readonly content: string;
}
