import { Test, TestingModule } from '@nestjs/testing';
import { ComplyadvantageService } from './complyadvantage.service';

describe('ComplyadvantageService', () => {
  let service: ComplyadvantageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplyadvantageService],
    }).compile();

    service = module.get<ComplyadvantageService>(ComplyadvantageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
