import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MESSAGE_BROKER } from '../constants';
import { InventoryEventController } from './inventory.event-controller';

@Module({
  controllers: [InventoryController,InventoryEventController],
  providers: [InventoryService],
  imports : [
    TypeOrmModule.forFeature([Inventory]),
    ClientsModule.register([
      {
        name:MESSAGE_BROKER,
        transport:Transport.NATS,
        options:{
              servers:process.env.NATS_URL
        }
      }
    ])
  ]
})
export class InventoryModule {}
