import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SanctionService } from './sanction.service';
import { SanctionController } from './sanction.controller';
import { ComplyadvantageModule } from 'src/complyadvantage/complyadvantage.module';
import { RequestLoggerMiddleware } from 'src/middleware/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/interceptors/response';

@Module({
  providers: [
    SanctionService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  controllers: [SanctionController],
  imports: [ComplyadvantageModule],
})
export class SanctionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
