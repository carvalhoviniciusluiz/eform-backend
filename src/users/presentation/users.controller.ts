import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserBodyDTO, UpdateUserBodyDTO, UserException } from 'users/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedUserResponseDto } from 'users/presentation/dtos';
import { IUserService } from 'users/domain';
import { USER_SERVICE } from 'users/../constants';

@ApiTags('USER')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService
  ) {}

  @ApiOkResponse({ type: PaginatedUserResponseDto })
  @Get()
  async find(@Query(ValidationPipe) paginateDto: RequestPaginateDto): Promise<PaginatedUserResponseDto> {
    const { page, pagesize } = paginateDto;
    const [rows, count] = await this.userService.find(page, pagesize);
    return new PaginatedUserResponseDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body(new ValidationPipe({ transform: true })) body: CreateUserBodyDTO): Promise<void> {
    try {
      await this.userService.save(body);
    } catch (error) {
      throw UserException.canNotCreateUser(error.userId);
    }
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserBodyDTO): Promise<void> {
    await this.userService.update(id, body);
  }
}
