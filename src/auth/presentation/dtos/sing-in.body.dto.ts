import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SingInBodyDto {
  @ApiProperty({ example: 'admin@admin OR 571.278.013-55' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @Transform(({ value }) => value.toLowerCase())
  credential: string;

  @ApiProperty({ example: '123Change@' })
  @IsNotEmpty()
  password: string;
}
