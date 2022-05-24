import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProduces,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ComplyadvantageService } from 'src/complyadvantage/complyadvantage.service';
import { SanctionResponse } from './dtos/sanction.dto';

@Controller('sanction')
@UseInterceptors(ClassSerializerInterceptor)
export class SanctionController {
  constructor(public complyadvantageService: ComplyadvantageService) {}

  @Get('/health')
  health() {
    return;
  }

  @Get('/search')
  @ApiQuery({
    name: 'year_of_birth',
    type: String,
    description: 'Birth year of the person',
    required: false,
  })
  @ApiOperation({
    summary: 'Search for sanction',
  })
  @ApiResponse({
    status: 200,
    type: SanctionResponse,
    description: '',
  })
  @ApiResponse({
    status: 404,
    description: '',
  })
  @ApiProduces('application/json')
  async verifyToken(
    @Query('full_name') fullName: string,
    @Query('year_of_birth') yearOfBirth: number,
  ): Promise<SanctionResponse> {
    const result = await this.complyadvantageService.search(
      fullName,
      yearOfBirth,
    );
    return result;
  }
}
