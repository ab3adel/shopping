import { InjectRepository } from "@nestjs/typeorm";
import { Outbox } from "./entities/outbox.entity";
import { Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { MESSAGE_BROKER } from "../constants/constant";
import { ClientProxy } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";
import { OutboxService } from "./outbox.service";
import { lastValueFrom } from "rxjs";



export class OutboxProcessor {

    constructor(

        @Inject(MESSAGE_BROKER)
        private readonly messageBroker :ClientProxy,
        private readonly outboxService:OutboxService,
        @InjectRepository(Outbox)
        private readonly outboxRepository:Repository<Outbox>
    ){}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async processEvents(){
        console.log('cron jobs handling event')
        const events = await this.outboxService.getUnprocessedEvents({target:'Order',take:100})
        await Promise.all(
            events.map(async (ele)=>{
               await  lastValueFrom(this.messageBroker.emit(ele.type,ele.payload))
               await this.outboxRepository.delete({id:ele.id})
            }
            )
        )
       
    } 
}