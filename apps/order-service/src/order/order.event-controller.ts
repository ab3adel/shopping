import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { OrderService } from "./order.service";
import { Payment } from "apps/gayment-service/src/payment/entities/payment.entity";


@Controller()
export class OrderEventController {

    constructor(
        private readonly orderService:OrderService
    ) {}
    @EventPattern('Payment.Succeeded')
   async updateOrderStatus(@Payload() payment:Payment){
    console.log('payment succeeded',payment)
    await this.orderService.updateOrder(payment.orderId)

    }


}