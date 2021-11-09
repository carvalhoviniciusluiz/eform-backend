import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseUserRequestDto {
  @ApiProperty({ example: '886bbb4a-7f6a-4122-8e60-7a60e93107dd' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Pepsi' })
  @Expose()
  firstname: string;

  @ApiProperty({ example: '31565104000177' })
  @Expose()
  lastname: string;

  @ApiProperty({ example: '31565104000177' })
  @Expose()
  documentNumber: string;

  @ApiProperty({ example: '31565104000177' })
  @Expose()
  email: string;

  @ApiProperty({ example: '31565104000177' })
  @Expose()
  phone: string;

  @ApiProperty({ example: '2021-10-07T13:59:39.792Z' })
  @Expose()
  updatedAt: Date;
}
