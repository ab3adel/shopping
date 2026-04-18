import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";




@Entity()
export class Outbox {

    @PrimaryColumn()
    id!:string 

    @Column()
    type!:string 

    @Column({type:'json'})
    payload!:Record<string,any>

    @Column()
    target!:string

    @CreateDateColumn()
    createdAt!:Date

}