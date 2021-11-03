import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUsersCommand, CreateUserCommand, UpdateUserCommand } from 'users/application';
import { CreateUserBodyDTO, ResponseUsersRequestDto, UpdateUserBodyDTO } from 'users/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedUserResultsDto } from 'users/presentation/dtos';
import { IUser } from 'users/domain';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @ApiOkResponse({ type: PaginatedUserResultsDto })
  @Get()
  async getAll(@Query(ValidationPipe) paginateDto: RequestPaginateDto): Promise<PaginatedUserResultsDto> {
    const { page, pagesize } = paginateDto;
    const command = new GetUsersCommand(page, pagesize);
    const [rows, count] = await this.commandBus.execute<GetUsersCommand, [IUser[], number]>(command);
    const parsedRows = ResponseUsersRequestDto.factory(rows);

    return new PaginatedUserResultsDto(parsedRows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body() body: CreateUserBodyDTO): Promise<void> {
    const command = new CreateUserCommand(body);
    await this.commandBus.execute(command);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  update(@Body() body: UpdateUserBodyDTO, @Param('id', new ParseUUIDPipe()) id: string): void {
    const command = new UpdateUserCommand(id, body);
    this.commandBus.execute(command);
  }
}
