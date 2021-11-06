import {
  Body,
  Controller,
  Get,
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
import { CreateUserBodyDTO, UpdateUserBodyDTO } from 'users/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedUserResultsDto } from 'users/presentation/dtos';
import { UserService } from 'users/domain';

@ApiTags('USER')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
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
