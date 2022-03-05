import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ProductionOrderDTO } from './productionorder.dto';
import { ProductionOrderService } from './productionorder.service';

@Controller('productionorder')
export class ProductionOrderController {
  constructor(private productionOrderService: ProductionOrderService) {}

  @Post()
  public create(@Body() productionOrder: ProductionOrderDTO) {
    this.productionOrderService.create(productionOrder);
  }
}
