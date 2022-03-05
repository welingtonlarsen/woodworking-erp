import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Forniture } from './forniture.model';
import { ProductionOrder } from './productionorder.model';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Forniture, (forniture) => forniture.room)
  fornitures: Forniture[];

  @ManyToOne(() => ProductionOrder, (productionOrder) => productionOrder.rooms)
  productionOrder: ProductionOrder;

  constructor(name: string, productionOrder: ProductionOrder) {
    this.name = name;
    this.productionOrder = productionOrder;
  }
}
