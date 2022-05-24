import * as bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import configuration from './config/configuration';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SanctionModule } from './sanction/sanction.module';

function setupApp(app: INestApplication) {
  // cors
  app.enableCors();

  // pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // swagger documents
  const docConfig = new DocumentBuilder()
    .setTitle('Verification API')
    .setDescription('The Verification API documents')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const config = configuration()[process.env['runtime']];

  // create and setup vaulting server
  const sanctionServer = express();
  const sanctionApp = await NestFactory.create(
    SanctionModule,
    new ExpressAdapter(sanctionServer),
  );
  setupApp(sanctionApp);
  await sanctionApp.init();
  http.createServer(sanctionServer).listen(config['api_port'], '0.0.0.0');
}
bootstrap();
