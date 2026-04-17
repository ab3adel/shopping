import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { MESSAGE_BROKER } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { InsertProductDto } from './dto/insert-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { lastValueFrom } from 'rxjs';
import { Payment } from 'apps/gayment-service/src/payment/entities/payment.entity';

@Injectable()
export class InventoryService {


constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository:Repository<Inventory>,
    @Inject(MESSAGE_BROKER)
    private readonly messageBroker:ClientProxy
) {}

 async getAll(){
    return await this.inventoryRepository.find()
 }

 async insertProduct(body:InsertProductDto){
    const uuid = crypto.randomUUID()
    const inventory = new Inventory()
    inventory.id=uuid
    inventory.count=body.count
    inventory.price=body.price
    inventory.product=body.product
    await this.inventoryRepository.save(inventory)
 }

 async updateProduct(body: Payment) {
  try {
    const product = await this.inventoryRepository.findOne({
      where: { id: body.productId }
    });

    if (!product) {
        await lastValueFrom(this.messageBroker.emit('Inventory.Failed',{
                                                                      productId:body.productId,
                                                                      orderId:body.orderId,
                                                                      paymentId:body.id
                                                                    }))
      throw new NotFoundException('Product not found');
    }

    if (product.count < body.count) {
          await lastValueFrom(this.messageBroker.emit('Inventory.Failed',{
                                                                      productId:body.productId,
                                                                      orderId:body.orderId,
                                                                      paymentId:body.id
                                                                    }))
      throw new BadRequestException('Insufficient stock');
    }

    product.count -= body.count;

    const saved = await this.inventoryRepository.save(product);

    await lastValueFrom(
      this.messageBroker.emit('Inventory.Succeeded', {
        productId: body.productId,
        orderId: body.orderId,
        paymentId: body.id,
      })
    );

    return saved;

  } catch (err) {
    await lastValueFrom(
      this.messageBroker.emit('Inventory.Failed', {
        productId: body.productId,
        orderId: body.orderId,
        paymentId: body.id,
      })
    );

    throw err;
  }
}
}
