import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateSurveyBodyDTO {
  @ApiProperty({
    type: String,
    description: 'The form id of the survey',
    example: '0315ded9-a16a-4930-a25a-231fe963bf57',
    required: true
  })
  @IsNotEmpty()
  @IsUUID()
  readonly formId: string;

  @ApiProperty({
    type: String,
    description: 'The parent id of the survey',
    example: '0315ded9-a16a-4930-a25a-231fe963bf57',
    required: true
  })
  @IsOptional()
  @IsUUID()
  readonly parentId?: string;

  @ApiProperty({
    type: String,
    description: 'The name of the form',
    example: 'Survey test',
    minLength: 2,
    maxLength: 200,
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'The text will be uppercase',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  uppercase?: boolean;
}
