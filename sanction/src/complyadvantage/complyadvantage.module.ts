import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ComplyadvantageService } from './complyadvantage.service';

@Module({
  imports: [HttpModule],
  providers: [ComplyadvantageService],
  exports: [ComplyadvantageService],
})
export class ComplyadvantageModule {}
