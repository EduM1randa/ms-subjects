import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { RmqExceptionFilter } from './common/filters/rm-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://mfivcrgg:3zQWvCAEyg_q0a7QS7m7e-whP-jp4pYL@prawn.rmq.cloudamqp.com/mfivcrgg'],
      queue: 'test',
      queueOptions: {
        durable: false
      },
    },
  })
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RmqExceptionFilter());
  await app.listen();
}
bootstrap();