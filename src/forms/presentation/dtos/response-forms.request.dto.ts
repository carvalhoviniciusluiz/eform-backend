import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseFormRequestDto {
  @ApiProperty({ example: '886bbb4a-7f6a-4122-8e60-7a60e93107dd' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'VC' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'reviewed' })
  @Expose()
  status: string;

  @ApiProperty({
    example: {
      avatars: [
        'https://avatars.githubusercontent.com/u/22005684?v=4',
        {
          char: 'XZ',
          color: '#4fc9da',
          backgroundColor: '#ddf8fc'
        }
      ],
      total: 2
    }
  })
  @Expose()
  consumers: any;

  @ApiProperty({ example: '2021-10-07T13:59:39.792Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2021-10-07T13:59:39.792Z' })
  @Expose()
  updatedAt: Date;
}
