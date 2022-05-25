import { Injectable } from '@nestjs/common';
import { ComplyadvantageService } from 'src/complyadvantage/complyadvantage.service';
import { DetailedLogger } from 'src/logger/detailed';

@Injectable()
export class SanctionService {
  private readonly logger = new DetailedLogger('SanctionService', {
    timestamp: true,
  });

  constructor(private complyadvantageService: ComplyadvantageService) {}

  async search(fullName: string, yearOfBirth: number): Promise<string> {
    const result = await this.complyadvantageService.search(
      fullName,
      yearOfBirth,
    );
    return JSON.stringify(result);
  }

  async raw(fullName: string, yearOfBirth: number): Promise<string> {
    const result = await this.complyadvantageService.raw(fullName, yearOfBirth);
    return JSON.stringify(result);
  }
}
