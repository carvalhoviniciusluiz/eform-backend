import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class RequestPaginateDto {
  @ApiPropertyOptional({ type: Number, example: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 0;

  @ApiPropertyOptional({ type: Number, example: 20 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pagesize?: number = 20;
}
