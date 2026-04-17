import { Min } from "class-validator";
import { Check, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity()
@Check(`"count" >=1`)
export class Inventory {

    @PrimaryColumn()
    id!:string 

    @Column()
    product!:string 

    @Column()
    price!:number 
    
    @Min(0)
    @Column()
    count!:number 

    @CreateDateColumn()
    createdAt!:Date
}