import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { read } from 'fs';
import { Repository } from 'typeorm';
import { Client } from '../model/client.model';
import { Forniture } from '../model/forniture.model';
import { ProductionOrder } from '../model/productionorder.model';
import { Room } from '../model/room.model';

@Injectable()
export class ProductionOrderRepositoriesFactory {
  constructor(
    @InjectRepository(Client) readonly clientRepository: Repository<Client>,

    @InjectRepository(ProductionOrder)
    readonly productionOrderRepository: Repository<ProductionOrder>,

    @InjectRepository(Forniture)
    readonly fornitureRepository: Repository<Forniture>,

    @InjectRepository(Room)
    readonly roomRepository: Repository<Room>,
  ) {}
}
