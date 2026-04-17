import { NestFactory } from '@nestjs/core';
import { GaymentServiceModule } from './gayment-service.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GaymentServiceModule);

  app.useGlobalPipes(new ValidationPipe());
    app.connectMicroservice(
      {
        transport:Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
          queue: 'payment-service',
        },
      },
      { inheritAppConfig: true },
    );
    await app.startAllMicroservices();

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
