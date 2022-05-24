import { Injectable } from '@nestjs/common';
import { ComplyadvantageService } from 'src/complyadvantage/complyadvantage.service';
import { DetailedLogger } from 'src/logger/detailed';

@Injectable()
export class SanctionService {
  private readonly logger = new DetailedLogger('SanctionService', {
    timestamp: true,
  });

  constructor(private complyadvantageService: ComplyadvantageService) {}

  async search(fullName: string, yearOfBirth: number) {
    const result = await this.complyadvantageService.search(
      fullName,
      yearOfBirth,
    );
    return JSON.stringify(result);
  }
}
