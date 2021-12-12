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
import { CreateSurveyBodyDTO, SurveyException, UpdateSurveyBodyDTO } from 'surveys/presentation';
import { SurveyRequestPaginateDto, PaginatedSurveyResponseDto } from 'surveys/presentation/dtos';
import { ISurveyService } from 'surveys/domain';
import { FormException } from 'forms/presentation';
import { SURVEY_SERVICE } from '../../constants';

@ApiTags('SURVEY')
@ApiBearerAuth()
@Controller('surveys')
@UseGuards(AuthGuard('jwt'))
export class SurveysController {
  constructor(
    @Inject(SURVEY_SERVICE)
    private readonly surveyService: ISurveyService
  ) {}

  @ApiOkResponse({ type: PaginatedSurveyResponseDto })
  @Get()
  async find(@Query(ValidationPipe) paginateDto: SurveyRequestPaginateDto): Promise<PaginatedSurveyResponseDto> {
    const { page, pagesize, formid: formId } = paginateDto;

    const [rows, count] = await this.surveyService.find(formId, page, pagesize);
    return new PaginatedSurveyResponseDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body(new ValidationPipe({ transform: true })) body: CreateSurveyBodyDTO): Promise<void> {
    try {
      await this.surveyService.save(body);
    } catch (error) {
      if (error.code === '22P02' || error.formNotFound) {
        throw FormException.notFoundForId(body.formId);
      }
      if (error.surveyExists) {
        throw SurveyException.unprocessed(error.surveyName);
      }
      if (error.parentNotFound) {
        throw SurveyException.notFoundForId(error.parentId);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateSurveyBodyDTO): Promise<void> {
    try {
      await this.surveyService.update(id, body);
    } catch (error) {
      if (error.code === '22P02' || error.formNotFound) {
        throw FormException.notFoundForId(body.formId);
      }
      if (error.surveyExists) {
        throw SurveyException.unprocessed(error.surveyName);
      }
      if (error.parentNotFound) {
        throw SurveyException.notFoundForId(error.parentId);
      }
      throw new InternalServerErrorException();
    }
  }
}
