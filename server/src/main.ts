import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Proxy generator')
  .setDescription('The API description')
  .setVersion('0.1.0')
  // .addTag('user')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs/api', app, document);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
