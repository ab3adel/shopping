import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MESSAGE_BROKER } from '../constants/constant';
import { OrderEventController } from './order.event-controller';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),
           ClientsModule.register([{
            name:MESSAGE_BROKER,
            transport:Transport.NATS,
            options:{
              servers:process.env.NATS_URL
            }
           }])],
  controllers: [OrderController,OrderEventController],
  providers: [OrderService],
})
export class OrderModule {}
