import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    
        })
  ],
  controllers: [InventoryServiceController],
  providers: [InventoryServiceService],
})
export class InventoryServiceModule {}
