import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductionOrderInfo } from './dto/response/productionorderinfo.response.dto';
import { ProductionOrderDTO } from './dto/request/productionorder.dto';
import { ProductionOrderService } from './productionorder.service';

@Controller('productionorder')
export class ProductionOrderController {
  constructor(private productionOrderService: ProductionOrderService) {}

  @Post()
  public create(@Body() productionOrder: ProductionOrderDTO) {
    this.productionOrderService.create(productionOrder);
  }

  @Get()
  public async getById(@Query('id') productionOrderId: number): Promise<any> {
    return this.productionOrderService.getById(productionOrderId);
  }

  @Get()
  public async getAll(): Promise<ProductionOrderInfo[]> {
    return await this.productionOrderService.getAll();
  }
}
