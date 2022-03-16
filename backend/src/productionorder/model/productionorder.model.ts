import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './client.model';
import { Room } from './room.model';

@Entity('production_order')
export class ProductionOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  deadline: Date;

  @ManyToOne(() => Client, (client) => client.productionOrders)
  client: Client;

  @OneToMany(() => Room, (room) => room.productionOrder)
  rooms: Room[];

  constructor(client: Client, start: Date, deadline: Date) {
    this.client = client;
    this.start = start;
    this.deadline = deadline;
  }
}
