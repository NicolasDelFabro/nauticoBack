import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // rechaza el request si mandan propiedades de más
      transform: true,          // convierte tipos automáticamente (ej: string a number)
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();