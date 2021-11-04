import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserBodyDTO, UpdateUserBodyDTO } from 'users/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedUserResultsDto } from 'users/presentation/dtos';
import { UserService } from 'users/domain';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: PaginatedUserResultsDto })
  @Get()
  async find(@Query(ValidationPipe) paginateDto: RequestPaginateDto): Promise<PaginatedUserResultsDto> {
    const { page, pagesize } = paginateDto;
    const [rows, count] = await this.userService.find(page, pagesize);
    return new PaginatedUserResultsDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body() body: CreateUserBodyDTO): Promise<void> {
    await this.userService.save(body);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserBodyDTO): Promise<void> {
    await this.userService.update(id, body);
  }
}
