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
import {
  CreateQuestionBodyDTO,
  QuestionException,
  UpdateQuestionBodyDTO,
  QuestionRequestPaginateDto
} from 'questions/presentation';
import { PaginatedQuestionResponseDto } from 'questions/presentation/dtos';
import { IQuestionService } from 'questions/domain';
import { QUESTION_SERVICE } from '../../constants';
import { SurveyException } from 'surveys/presentation';

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
  async find(@Query(ValidationPipe) paginateDto: QuestionRequestPaginateDto): Promise<PaginatedQuestionResponseDto> {
    const { surveyid: surveyId, page, pagesize } = paginateDto;
    const [rows, count] = await this.questionService.find(surveyId, page, pagesize);
    return new PaginatedQuestionResponseDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body(new ValidationPipe({ transform: true })) body: CreateQuestionBodyDTO): Promise<void> {
    try {
      await this.questionService.save(body);
    } catch (error) {
      if (error.code === '22P02' || error.surveyNotFound) {
        throw SurveyException.notFoundForId(body.surveyId);
      }
      if (error.questionExists) {
        throw QuestionException.unprocessed();
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateQuestionBodyDTO): Promise<void> {
    try {
      await this.questionService.update(id, body);
    } catch (error) {
      if (error.code === '22P02' || error.surveyNotFound) {
        throw SurveyException.notFoundForId(body.surveyId);
      }
      if (error.questionExists) {
        throw QuestionException.unprocessed();
      }
      throw new InternalServerErrorException();
    }
  }
}
