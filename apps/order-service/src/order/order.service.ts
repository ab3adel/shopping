import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { OrderStatusEnum } from '../enums/OrderStatus.enum';
import { MESSAGE_BROKER } from '../constants/constant';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Outbox } from '../outbox/entities/outbox.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository :Repository<Order>,
    private readonly dataSource:DataSource,
    @Inject(MESSAGE_BROKER)
    private readonly brokerService:ClientProxy
  ){}
  async create(createOrderDto: CreateOrderDto) {
   
    const uuid = crypto.randomUUID()
    const order = new Order()
    order.id=uuid 
    order.count=createOrderDto.count
    order.product=createOrderDto.product
    order.status=OrderStatusEnum.PLACED
    order.userName=createOrderDto.userName
    order.userId=createOrderDto.userId
    order.price=createOrderDto.price
    order.productId=createOrderDto.productId
     const queryRunner = this.dataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      const orderRepo = queryRunner.manager.getRepository(Order)
      const outboxRepo = queryRunner.manager.getRepository(Outbox)
    try {
     const saved_order =await orderRepo.save(order)
     await outboxRepo.save({
      type:'Order.Placed',
      payload:saved_order,
      target:'Order'
     })

     await queryRunner.commitTransaction()

    }
    catch(err){
      queryRunner.rollbackTransaction()
      throw err
    }
    finally{
      queryRunner.release()
    }
    
    //await lastValueFrom(this.brokerService.emit('Order.Placed',saved_order))
  }

  async findAll() {
    return await this.orderRepository.find()
  }


 async updateSuccessfullOrder(@Payload() order_id:string){
  const result = await this.orderRepository.update({id:order_id},{status:OrderStatusEnum.CREATED})
  if (result.affected=== 0){
    throw new NotFoundException(`order ${order_id} was not updated `)
  }
 }

 async updateFailedOrder(@Payload() order_id:string){
  const result = await this.orderRepository.update({id:order_id},{status:OrderStatusEnum.CANCELLED})
  if (result.affected=== 0){
    throw new NotFoundException(`order ${order_id} was not updated `)
  }
 }

}
