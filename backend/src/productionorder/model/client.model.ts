import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductionOrder } from './productionorder.model';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductionOrder, (productionOrder) => productionOrder.client)
  productionOrders: ProductionOrder[];

  constructor(name: string) {
    this.name = name;
  }
}
