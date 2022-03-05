import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductionOrderInfo } from './dto/response/productionorderinfo.response.dto';
import { ProductionOrderDTO } from './productionorder.dto';
import { ProductionOrderService } from './productionorder.service';

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
}
