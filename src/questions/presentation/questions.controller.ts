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
import { CreateQuestionBodyDTO, UpdateQuestionBodyDTO } from 'questions/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedQuestionResponseDto } from 'questions/presentation/dtos';
import { IQuestionService } from 'questions/domain';
import { QUESTION_SERVICE } from '../../constants';

@ApiTags('QUESTION')
@ApiBearerAuth()
@Controller('questions')
@UseGuards(AuthGuard('jwt'))
export class QuestionsController {
  constructor(
    @Inject(QUESTION_SERVICE)
    private readonly questionService: IQuestionService
  ) {}

  @ApiOkResponse({ type: PaginatedQuestionResponseDto })
  @Get()
  async find(@Query(ValidationPipe) paginateDto: RequestPaginateDto): Promise<PaginatedQuestionResponseDto> {
    const { page, pagesize } = paginateDto;
    const [rows, count] = await this.questionService.find(page, pagesize);
    return new PaginatedQuestionResponseDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body(new ValidationPipe({ transform: true })) body: CreateQuestionBodyDTO): Promise<void> {
    try {
      await this.questionService.save(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateQuestionBodyDTO): Promise<void> {
    await this.questionService.update(id, body);
  }
}
