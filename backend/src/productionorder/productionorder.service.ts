import { Injectable } from '@nestjs/common';
import { ProductionOrderInfo } from './dto/response/productionorderinfo.response.dto';
import { Client } from './model/client.model';
import { Forniture } from './model/forniture.model';
import { ProductionOrder } from './model/productionorder.model';
import { Room } from './model/room.model';
import { ProductionOrderDTO } from './dto/request/productionorder.dto';
import { ProductionOrderRepositoriesFactory } from './repository/repositoriesfactory.repository';

@Injectable()
export class ProductionOrderService {
  constructor(private repositories: ProductionOrderRepositoriesFactory) {}

  public async create(productionOrderDto: ProductionOrderDTO) {
    const client = await this.repositories.clientRepository.save(
      new Client(productionOrderDto.client.name),
    );

    const productionOrder =
      await this.repositories.productionOrderRepository.save(
        new ProductionOrder(
          client,
          productionOrderDto.start,
          productionOrderDto.deadline,
        ),
      );

    productionOrderDto.rooms.forEach(async (roomDto) => {
      const room = await this.repositories.roomRepository.save(
        new Room(roomDto.name, productionOrder),
      );

      roomDto.fornitures.forEach(async (fornitureDto) => {
        await this.repositories.fornitureRepository.save(
          new Forniture(
            fornitureDto.name,
            fornitureDto.productionStart,
            fornitureDto.containsPurchaseOrder,
            fornitureDto.forecast,
            fornitureDto.woodWorker,
            fornitureDto.deadline,
            room,
          ),
        );
      });
    });
  }

  public async getById(id: number): Promise<ProductionOrder> {
    const productionOrder =
      await this.repositories.productionOrderRepository.findByIds([id], {
        relations: ['client', 'rooms', 'rooms.fornitures'],
      });

    return productionOrder[0];
  }

  public async getAll(): Promise<ProductionOrderInfo[]> {
    const productionOrders =
      await this.repositories.productionOrderRepository.find({
        relations: ['client', 'rooms', 'rooms.fornitures'],
      });

    const productionOrderInfos = productionOrders.map((productionOrder) => {
      const productionOrderId = productionOrder.id;
      const clientName = productionOrder.client.name;
      const ambientsQuantity = productionOrder.rooms.length;

      const containsPurchaseOrderQuantity = productionOrder.rooms.reduce(
        (containsPurchaseOrderTotalQuantity, room) => {
          return (
            containsPurchaseOrderTotalQuantity +
            room.fornitures.reduce(
              (containsPurchaseOrderQuantityInForniture, forniture) => {
                if (forniture.containsPurchaseOrder)
                  return containsPurchaseOrderQuantityInForniture + 1;
                return containsPurchaseOrderQuantityInForniture;
              },
              0,
            )
          );
        },
        0,
      );

      const fornituresQuantity = productionOrder.rooms.reduce(
        (fornituresQuantity, room) =>
          fornituresQuantity + room.fornitures.length,
        0,
      );

      const start = productionOrder.start.valueOf();
      const deadline = productionOrder.deadline.valueOf();
      const purchaseOrderProgress = this.calculateContainsPurchaseOrderProgress(
        fornituresQuantity,
        containsPurchaseOrderQuantity,
      );

      return new ProductionOrderInfo(
        productionOrderId,
        clientName,
        ambientsQuantity,
        fornituresQuantity,
        start,
        deadline,
        purchaseOrderProgress,
      );
    });

    return productionOrderInfos;
  }

  private calculateContainsPurchaseOrderProgress(
    fornituresQuantity: number,
    containsPurchaseOrderQuantity: number,
  ): number {
    if (containsPurchaseOrderQuantity == 0 || fornituresQuantity == 0) return 0;
    return (containsPurchaseOrderQuantity / fornituresQuantity) * 100;
  }
}
