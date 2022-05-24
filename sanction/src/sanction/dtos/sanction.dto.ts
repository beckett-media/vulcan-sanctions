import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SanctionResponse {
  @ApiProperty({ description: 'Reference of this search' })
  @IsString()
  @MinLength(1)
  ref: string;

  @ApiProperty({ description: 'Name of the person being searched' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: 'Score of the matched result' })
  @IsNumber()
  score: number;

  @ApiProperty({ description: 'Lengh of the matched types' })
  @IsNumber()
  length: number;

  @ApiProperty({ description: 'Comma-separated string of matched types' })
  @IsString()
  @MinLength(1)
  types: string;

  constructor(partial: Partial<SanctionResponse>) {
    Object.assign(this, partial);
  }
}
