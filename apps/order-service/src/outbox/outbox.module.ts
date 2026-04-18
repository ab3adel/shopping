import { Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { OutboxController } from './outbox.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outbox } from './entities/outbox.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MESSAGE_BROKER } from '../constants/constant';
import { OutboxProcessor } from './outbox.processor';

@Module({
  controllers: [OutboxController],
  exports:[OutboxService],
  providers: [OutboxService,OutboxProcessor],
  imports:[
    TypeOrmModule.forFeature([Outbox]),
    ClientsModule.register([
      {
        transport:Transport.NATS,
        name:MESSAGE_BROKER,
        options:{
          servers:process.env.NATS_URL
        }
      }
    ])
  ]
})
export class OutboxModule {}
