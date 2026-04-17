import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Payment } from 'apps/gayment-service/src/payment/entities/payment.entity';
import { InsertProductDto } from './dto/insert-product.dto';

@Controller()
export class InventoryEventController {
  constructor(private readonly inventoryService: InventoryService) {}


@EventPattern("Inventory.Succeeded")
async updateInventory(@Payload() payment:Payment){

    return await this.inventoryService.updateProduct(payment)
}

  
}
