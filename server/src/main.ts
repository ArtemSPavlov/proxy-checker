import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Proxy generator')
  .setDescription('The API description')
  .setVersion('0.1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs/api', app, document);
  app.enableCors();
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
