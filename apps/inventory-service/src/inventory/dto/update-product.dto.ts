import { InsertProductDto } from "./insert-product.dto";


export class UpdateProductDto extends InsertProductDto {
    productId!:string
    orderId!:string
}