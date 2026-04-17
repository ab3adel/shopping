import { Module } from '@nestjs/common';
import { GaymentServiceController } from './gayment-service.controller';
import { GaymentServiceService } from './gayment-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
          host:process.env.POSTGRES_HOST,
          port : +(process.env.POSTGRES_PORT??'5432'),
          name:process.env.POSTGRES_DB, 
          password:process.env.POSTGRES_PASSWORD,
          username:process.env.POSTGRES_USER,
          type:'postgres',
          autoLoadEntities:true,
          synchronize:true
    
        }),
     PaymentModule
  ],
  controllers: [GaymentServiceController],
  providers: [GaymentServiceService],
})
export class GaymentServiceModule {}
