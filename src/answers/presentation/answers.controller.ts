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
import { CreateAnswerBodyDTO, UpdateAnswerBodyDTO } from 'answers/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedAnswerResponseDto } from 'answers/presentation/dtos';
import { IAnswerService } from 'answers/domain';
import { ANSWER_SERVICE } from '../../constants';

@ApiTags('ANSWER')
@ApiBearerAuth()
@Controller('answers')
@UseGuards(AuthGuard('jwt'))
export class AnswersController {
  constructor(
    @Inject(ANSWER_SERVICE)
    private readonly answerService: IAnswerService
  ) {}

  @ApiOkResponse({ type: PaginatedAnswerResponseDto })
  @Get()
  async find(@Query(ValidationPipe) paginateDto: RequestPaginateDto): Promise<PaginatedAnswerResponseDto> {
    const { page, pagesize } = paginateDto;
    const [rows, count] = await this.answerService.find(page, pagesize);
    return new PaginatedAnswerResponseDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body(new ValidationPipe({ transform: true })) body: CreateAnswerBodyDTO): Promise<void> {
    try {
      await this.answerService.save(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateAnswerBodyDTO): Promise<void> {
    await this.answerService.update(id, body);
  }
}
