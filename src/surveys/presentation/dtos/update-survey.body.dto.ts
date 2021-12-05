import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSurveyBodyDTO {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @ApiProperty({ minLength: 2, maxLength: 200, example: 'VC' })
  readonly name: string;
}
