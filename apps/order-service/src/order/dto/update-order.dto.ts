import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    
}

export class UpdateOrderStatusDto {
      
    productId!:string
    orderId!:string
    paymentId!:string
                                                    
                                                    
}
