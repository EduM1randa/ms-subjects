import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { RmqExceptionFilter } from './common/filters/rm-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URI||''],
      queue: process.env.API_QUEUE,
      queueOptions: {
        durable: false
      },
    },
  })
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RmqExceptionFilter());
}
bootstrap();