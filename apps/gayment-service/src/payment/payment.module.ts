import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MESSAGE_BROKER } from '../constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentHttpController } from './payment.http-controller';

@Module({
  controllers: [PaymentController,PaymentHttpController],
  providers: [PaymentService],
  imports:[
    TypeOrmModule.forFeature([Payment]),
    ClientsModule.register([{

      name:MESSAGE_BROKER,
      transport:Transport.NATS,
      options:{
        servers:process.env.NATS_URL
      }

    }])
  ]
})
export class PaymentModule {}
