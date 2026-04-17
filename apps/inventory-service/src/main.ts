import { NestFactory } from '@nestjs/core';
import { InventoryServiceModule } from './inventory-service.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(InventoryServiceModule);

  app.useGlobalPipes(new ValidationPipe());
      app.connectMicroservice(
        {
          transport:Transport.NATS,
          options: {
            servers: process.env.NATS_URL,
            queue: 'inventory-service',
          },
        },
        { inheritAppConfig: true },
      );
      await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
