import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto, updatePaymentFailedDto } from './dto/update-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern('Order.Placed')
  async create(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @EventPattern("Inventory.Failed")
  async updatePayment(@Payload() updatePaymentFailedDto:updatePaymentFailedDto){

    return await this.paymentService.updatePaymentFailed(updatePaymentFailedDto)
  }

 
}
