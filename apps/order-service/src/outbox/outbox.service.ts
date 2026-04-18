import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outbox } from './entities/outbox.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutboxService {

    constructor(
        @InjectRepository(Outbox)
        private readonly outboxRepository:Repository<Outbox>
    ){}


     getUnprocessedEvents(options:{target:string,take:number}):Promise<Outbox[]>{

       const events=  this.outboxRepository.find({where:{target:options.target},order:{createdAt:'ASC'},take:options.take})
       return events

    }
}
