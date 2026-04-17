import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { MESSAGE_BROKER } from '../constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository:Repository<Payment>,
    @Inject(MESSAGE_BROKER)
    private readonly messageBroker:ClientProxy

  ){}

  async create(createPaymentDto: CreatePaymentDto) {
    console.log('createPaymentDto',createPaymentDto)
    const uuid = crypto.randomUUID()
    const payment = new Payment()
    payment.id=uuid
    payment.count=createPaymentDto.count
    payment.orderId=createPaymentDto.orderId
    payment.price=createPaymentDto.price
    payment.product=createPaymentDto.product
    payment.userId=createPaymentDto.userId
    payment.userName=createPaymentDto.userName 
    payment.totalCoast=createPaymentDto.price + ( 0.15 * createPaymentDto.price)
    const saved_payment = await this.paymentRepository.save(payment)
    this.messageBroker.emit('Payment.Succeeded',saved_payment)


  }

  findAll() {
    return `This action returns all payment`;
  }

  
}
