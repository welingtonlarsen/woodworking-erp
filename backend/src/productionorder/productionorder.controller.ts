import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductionOrderInfo } from './dto/response/productionorderinfo.response.dto';
import {
  ProductionOrderDTO,
  UpdateProductionOrderDTO,
} from './dto/request/productionorder.dto';
import { ProductionOrderService } from './productionorder.service';
import { ProductionOrder } from './model/productionorder.model';

@Controller('productionorder')
export class ProductionOrderController {
  constructor(private productionOrderService: ProductionOrderService) {}

  @Post()
  public create(@Body() productionOrder: ProductionOrderDTO) {
    this.productionOrderService.create(productionOrder);
  }

  @Get()
  public async getAll(): Promise<ProductionOrderInfo[]> {
    return await this.productionOrderService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') productionOrderId: number): Promise<any> {
    return this.productionOrderService.getById(productionOrderId);
  }

  @Put()
  public async update(
    @Body() body: UpdateProductionOrderDTO,
  ): Promise<ProductionOrder> {
    return this.productionOrderService.update(body);
  }
}
