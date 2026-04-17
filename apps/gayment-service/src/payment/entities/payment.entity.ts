import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { PaymentStatusEnum } from "../payment.enum";


@Entity()
export class Payment {

    @PrimaryColumn()
    id!:string 

    @CreateDateColumn()
    createdAt!:Date 

    @Column({type:'enum',enum:PaymentStatusEnum})
    status!:PaymentStatusEnum

    @Column()
    orderId!:string

    @Column()
    userId!:string 

    @Column()
    userName!:string 

    @Column()
    product!:string
    
    @Column()
    productId!:string

    @Column()
    count!:number 

    @Column()
    price!:number 

    @Column()
    totalCoast!:number

    


}
