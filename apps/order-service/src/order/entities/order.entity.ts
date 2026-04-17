import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { OrderStatusEnum } from "../../enums/OrderStatus.enum";


@Entity()
export class Order {
    
    @PrimaryColumn()
    id!:string 

    @Column()
    product!:string
    
    @Column()
    productId!:string

    @Column({type:'enum',enum:OrderStatusEnum})
    status!:OrderStatusEnum

    @CreateDateColumn()
    createdAt!:Date

    @Column()
    count!:number 

    @Column()
    userId!:string 

    @Column()
    userName!:string

    @Column()
    price!:number

    
}
