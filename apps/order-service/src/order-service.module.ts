import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxModule } from './outbox/outbox.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [OrderModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      host:process.env.POSTGRES_HOST,
      port : +(process.env.POSTGRES_PORT??'5432'),
      database:process.env.POSTGRES_DB, 
      password:process.env.POSTGRES_PASSWORD,
      username:process.env.POSTGRES_USER,
      type:'postgres',
      autoLoadEntities:true,
      synchronize:true

    }),
    OutboxModule
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
