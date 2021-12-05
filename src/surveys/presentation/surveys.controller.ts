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
import { CreateSurveyBodyDTO, UpdateSurveyBodyDTO } from 'surveys/presentation';
import { RequestPaginateDto } from 'common/dtos';
import { PaginatedSurveyResponseDto } from 'surveys/presentation/dtos';
import { ISurveyService } from 'surveys/domain';
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
  async find(@Query(ValidationPipe) paginateDto: RequestPaginateDto): Promise<PaginatedSurveyResponseDto> {
    const { page, pagesize } = paginateDto;
    const [rows, count] = await this.surveyService.find(page, pagesize);
    return new PaginatedSurveyResponseDto(rows, count, page, pagesize);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Post()
  async store(@Body(new ValidationPipe({ transform: true })) body: CreateSurveyBodyDTO): Promise<void> {
    try {
      await this.surveyService.save(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateSurveyBodyDTO): Promise<void> {
    await this.surveyService.update(id, body);
  }
}
