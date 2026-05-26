import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import * as C from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger

  const config = new DocumentBuilder()
    .setTitle('CryptoTrade API')
    .setDescription('API documentation for CryptoTrade backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(C.ROUTES.SWAGGER, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server is running on http://localhost:${port}`, 'Bootstrap');
  console.log(
    `📘 Swagger documentation is available at http://localhost:${port}/${C.ROUTES.SWAGGER}`,
    'Bootstrap',
  );
}
bootstrap();
