import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionOrderInfo } from './dto/response/productionorderinfo.response.dto';
import { Client } from './model/client.model';
import { Forniture } from './model/forniture.model';
import { ProductionOrder } from './model/productionorder.model';
import { Room } from './model/room.model';
import { ProductionOrderDTO } from './productionorder.dto';

@Injectable()
export class ProductionOrderService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,

    @InjectRepository(ProductionOrder)
    private productionOrderRepository: Repository<ProductionOrder>,

    @InjectRepository(Forniture)
    private fornitureRepository: Repository<Forniture>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  public async create(productionOrderDto: ProductionOrderDTO) {
    const client = await this.clientRepository.save(
      new Client(productionOrderDto.client.name),
    );

    const productionOrder = await this.productionOrderRepository.save(
      new ProductionOrder(client),
    );

    productionOrderDto.rooms.forEach(async (roomDto) => {
      const room = await this.roomRepository.save(
        new Room(roomDto.name, productionOrder),
      );

      roomDto.fornitures.forEach(async (fornitureDto) => {
        await this.fornitureRepository.save(
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

  public async getAll(): Promise<ProductionOrderInfo[]> {
    const productionOrders = await this.productionOrderRepository.find({
      relations: ['client', 'rooms', 'rooms.fornitures'],
    });

    const productionOrderInfos = productionOrders.map((productionOrder) => {
      const productionOrderId = productionOrder.id;
      const clientName = productionOrder.client.name;
      const ambientsQuantity = productionOrder.rooms.length;
      const fornituresQuantity = productionOrder.rooms.reduce(
        (fornituresQuantity, room) =>
          fornituresQuantity + room.fornitures.length,
        0,
      );
      const productionStartDate = new Date().valueOf();
      const deadlineDate = new Date().valueOf();

      return new ProductionOrderInfo(
        productionOrderId,
        clientName,
        ambientsQuantity,
        fornituresQuantity,
        productionStartDate,
        deadlineDate,
      );
    });

    return productionOrderInfos;
  }
}
