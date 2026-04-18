import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { OrderService } from "./order.service";
import { Payment } from "apps/gayment-service/src/payment/entities/payment.entity";
import { UpdateOrderStatusDto } from "./dto/update-order.dto";


@Controller()
export class OrderEventController {

    constructor(
        private readonly orderService:OrderService
    ) {}

   @EventPattern('Inventory.Succeeded')
   async updateSuccessfullOrderStatus(@Payload() payment:UpdateOrderStatusDto){
    console.log('payment succeeded',payment)
    await this.orderService.updateSuccessfullOrder(payment.orderId)

    }
    
    @EventPattern("Inventory.Failed")
   async updateInventoryFailedOrderStatus(@Payload() payment:UpdateOrderStatusDto){
    console.log('order failed from inventory',payment)
    await this.orderService.updateFailedOrder(payment.orderId)

    }

  @EventPattern('Payment.Failed')
   async updatePaymentFailedOrderStatus(@Payload() payment:Payment){
    console.log('order failed',payment)
    await this.orderService.updateFailedOrder(payment.orderId)

    }

}