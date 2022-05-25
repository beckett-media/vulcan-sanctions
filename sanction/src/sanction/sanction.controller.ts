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
    name: 'full_name',
    type: String,
    description: "Person's full name",
    required: true,
  })
  @ApiQuery({
    name: 'year_of_birth',
    type: String,
    description: 'Birth year of the person',
    required: false,
  })
  @ApiOperation({
    summary: 'Search for sanctions of the specified person',
  })
  @ApiResponse({
    status: 200,
    type: SanctionResponse,
    description: 'Sanction information of the specified person',
  })
  @ApiProduces('application/json')
  async search(
    @Query('full_name') fullName: string,
    @Query('year_of_birth') yearOfBirth: number,
  ): Promise<SanctionResponse> {
    const result = await this.complyadvantageService.search(
      fullName,
      yearOfBirth,
    );
    return result;
  }

  @Get('/raw')
  @ApiQuery({
    name: 'full_name',
    type: String,
    description: "Person's full name",
    required: true,
  })
  @ApiQuery({
    name: 'year_of_birth',
    type: String,
    description: 'Birth year of the person',
    required: false,
  })
  @ApiOperation({
    summary: 'Search for sanctions of specified person',
  })
  @ApiResponse({
    status: 200,
    description: 'Sanction details of the specified person',
  })
  @ApiProduces('application/json')
  async raw(
    @Query('full_name') fullName: string,
    @Query('year_of_birth') yearOfBirth: number,
  ): Promise<SanctionResponse> {
    const result = await this.complyadvantageService.raw(fullName, yearOfBirth);
    return result;
  }
}
