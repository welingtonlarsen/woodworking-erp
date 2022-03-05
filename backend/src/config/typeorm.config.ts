import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'src/productionorder/model/client.model';
import { Forniture } from 'src/productionorder/model/forniture.model';
import { ProductionOrder } from 'src/productionorder/model/productionorder.model';
import { Room } from 'src/productionorder/model/room.model';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '172.26.0.2',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'woodworkerp',
  entities: [Client, Forniture, ProductionOrder, Room],
  synchronize: true,
  logging: true,
};
