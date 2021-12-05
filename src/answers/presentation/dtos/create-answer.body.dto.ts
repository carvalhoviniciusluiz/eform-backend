import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAnswerBodyDTO {
  @ApiProperty({
    type: String,
    description: 'The content of the answer',
    minLength: 2,
    maxLength: 100,
    example: 'VC'
  })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @ApiProperty({ minLength: 2, maxLength: 200, example: 'VC' })
  readonly content: string;
}
