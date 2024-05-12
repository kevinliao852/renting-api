import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

process.env.DB_HOST = 'xxx';
process.env.DB_NAME = 'test';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  Logger.log(`Server running on http://localhost:${port}`, 'MAIN');

  const documentConfig = new DocumentBuilder()
    .setTitle('Renting API')
    .setDescription('The renting API description')
    .setVersion('1.0')
    .addTag('rents')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);
  Logger.log(`Swagger running on http://localhost:${port}/api`, 'MAIN');

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
