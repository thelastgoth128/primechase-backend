import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule as FactorySwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Primechase API')
    .setDescription('The Primechase Studios API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = FactorySwaggerModule.createDocument(app, config);
  FactorySwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
