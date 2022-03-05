import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './model/client.model';
import { Forniture } from './model/forniture.model';
import { ProductionOrder } from './model/productionorder.model';
import { Room } from './model/room.model';
import { ProductionOrderController } from './productionorder.controller';
import { ProductionOrderService } from './productionorder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Forniture, ProductionOrder, Room]),
  ],
  controllers: [ProductionOrderController],
  providers: [ProductionOrderService],
})
export class ProductionOrderModule {}
