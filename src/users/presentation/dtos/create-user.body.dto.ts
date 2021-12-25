import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserBodyDTO {
  @ApiProperty({
    type: String,
    description: 'The firstname of the user',
    minLength: 2,
    maxLength: 100,
    example: 'Vinícius'
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ minLength: 2, maxLength: 100, example: 'Vinícius' })
  readonly firstname: string;

  @ApiProperty({
    type: String,
    description: 'The lastname of the user',
    minLength: 2,
    maxLength: 100,
    example: 'Carvalho'
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ minLength: 2, maxLength: 100, example: 'Carvalho' })
  readonly lastname: string;

  @ApiProperty({
    type: String,
    description: 'The document_number to access the account',
    example: '742.804.627-04',
    name: 'document_number'
  })
  @IsString()
  @ApiProperty({ example: '742.804.627-04' })
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  readonly documentNumber: string;

  @ApiProperty({
    type: String,
    description: 'The email to access the account',
    minLength: 10,
    maxLength: 150,
    example: 'carvalho.viniciusluiz@gmail.com'
  })
  @IsString()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250, example: 'carvalho.viniciusluiz@gmail.com' })
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'The phone to contact',
    minLength: 7,
    maxLength: 15,
    example: '5596981186382'
  })
  @IsString()
  @MinLength(7)
  @MaxLength(15)
  @ApiProperty({ minLength: 7, maxLength: 15, example: '5596981186382' })
  readonly phone: string;

  @ApiProperty({
    type: String,
    description: 'The password to access the account',
    minLength: 8,
    maxLength: 20,
    example: '123Change@'
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ minLength: 8, maxLength: 20, example: 'password' })
  readonly password: string;
}
