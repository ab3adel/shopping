import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { ValidationPipe } from '@nestjs/common';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrderServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(
    {
      transport:Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'notifications-service',
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
