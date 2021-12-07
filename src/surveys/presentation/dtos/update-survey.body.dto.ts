import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateSurveyBodyDTO {
  @ApiProperty({
    type: String,
    description: 'The form id of the survey',
    example: '0315ded9-a16a-4930-a25a-231fe963bf57'
  })
  @IsOptional()
  @IsUUID()
  readonly formId: string;

  @ApiProperty({
    type: String,
    description: 'The name of the form',
    example: 'Survey test',
    minLength: 2,
    maxLength: 200
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  readonly name: string;
}
