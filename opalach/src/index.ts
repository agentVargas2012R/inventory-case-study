import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import { createServer } from 'aws-serverless-express';
import { proxy, Response } from 'aws-serverless-express';

import { Context } from 'vm';

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.setGlobalPrefix('inventory');
  return app;
}

export async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await createApp(expressApp);
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: '*',
  });
  await app.init();
  return createServer(expressApp);
}

let cachedServer: Server;

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  console.log("event");
  console.log(event);

  console.log("context");
  console.log(context);

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
