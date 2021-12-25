import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { GrantTypeEnum } from 'auth/domain';

export class AuthBodyDto {
  @ApiProperty({
    type: String,
    description:
      'The type of grant you are requesting, must be "password_grant" | "refresh_token" | "create_credentials"',
    example: 'password_grant',
    name: 'grant_type',
    required: true
  })
  @IsNotEmpty()
  @Expose({ name: 'grant_type' })
  @IsEnum(GrantTypeEnum)
  grantType: GrantTypeEnum;

  //> refresh_token

  @ApiProperty({
    type: String,
    description: 'The refresh token only when grant_type is set to "refresh_token"',
    name: 'refresh_token'
  })
  @IsOptional()
  @Expose({ name: 'refresh_token' })
  refreshToken?: string;

  //> password_grant

  @ApiProperty({
    type: String,
    description: 'The credential only when grant_type is set to "password_grant"',
    maxLength: 250,
    example: '57127801355 | admin@admin'
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  @Transform(({ value }) => value?.toLowerCase())
  @Expose({ name: 'credential' })
  credential?: string;

  @ApiProperty({
    type: String,
    description: 'The password when grant_type is set to "password_grant" | "create_credentials"',
    minLength: 8,
    maxLength: 20,
    example: '123Change@'
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Expose({ name: 'password' })
  password?: string;

  //> create_credentials

  @ApiProperty({
    type: String,
    description: 'The firstname only when grant_type is set to "create_credentials"',
    minLength: 2,
    maxLength: 100,
    example: 'Vinícius'
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Expose({ name: 'firstname' })
  firstname?: string;

  @ApiProperty({
    type: String,
    description: 'The lastname only when grant_type is set to "create_credentials"',
    minLength: 2,
    maxLength: 100,
    example: 'Carvalho'
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Expose({ name: 'lastname' })
  lastname?: string;

  @ApiProperty({
    type: String,
    description: 'The document_number only when grant_type is set to "create_credentials"',
    example: '742.804.627-04',
    name: 'document_number'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'document_number' })
  @Transform(({ value }) => value?.replace(/[^0-9]/g, ''))
  documentNumber?: string;

  @ApiProperty({
    type: String,
    description: 'The email only when grant_type is set to "create_credentials"',
    minLength: 10,
    maxLength: 150,
    example: 'carvalho.viniciusluiz@gmail.com'
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(150)
  @Expose({ name: 'email' })
  email?: string;

  @ApiProperty({
    type: String,
    description: 'The phone only when grant_type is set to "create_credentials"',
    minLength: 7,
    maxLength: 15,
    example: '5596981186382'
  })
  @IsOptional()
  @IsString()
  @MinLength(7)
  @MaxLength(15)
  @Expose({ name: 'phone' })
  phone?: string;
}
