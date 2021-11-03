import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserBodyDTO {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ minLength: 2, maxLength: 100, example: 'Vinícius' })
  readonly firstname: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ minLength: 2, maxLength: 100, example: 'Carvalho' })
  readonly lastname: string;

  @IsOptional()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({ minLength: 11, maxLength: 11, example: '742.804.627-04' })
  readonly documentNumber: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ minLength: 2, maxLength: 100, example: 'carvalho.viniciusluiz@gmail.com' })
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(7)
  @MaxLength(15)
  @ApiProperty({ minLength: 7, maxLength: 15, example: '5596981186382' })
  readonly phone: string;
}
