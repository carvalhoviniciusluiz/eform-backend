import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
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
import { CreateFormBodyDTO, FormException, UpdateFormBodyDTO } from 'forms/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedFormResponseDto } from 'forms/presentation/dtos';
import { IFormService } from 'forms/domain';
import { FORM_SERVICE } from '../../constants';

@ApiTags('FORM')
@ApiBearerAuth()
@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {
  constructor(
    @Inject(FORM_SERVICE)
    private readonly formService: IFormService
  ) {}

  @ApiOkResponse({ type: PaginatedFormResponseDto })
  @Get()
  async find(@Query(ValidationPipe) paginateDto: RequestPaginateDto): Promise<PaginatedFormResponseDto> {
    const { page, pagesize } = paginateDto;
    const [rows, count] = await this.formService.find(page, pagesize);
    return new PaginatedFormResponseDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body(new ValidationPipe({ transform: true })) body: CreateFormBodyDTO): Promise<void> {
    try {
      await this.formService.save(body);
    } catch (error) {
      if (error.formExists) {
        throw FormException.unprocessed(error.formName);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateFormBodyDTO): Promise<void> {
    try {
      await this.formService.update(id, body);
    } catch (error) {
      if (error.formExists) {
        throw FormException.unprocessed(error.formName);
      }
      throw new InternalServerErrorException();
    }
  }
}
