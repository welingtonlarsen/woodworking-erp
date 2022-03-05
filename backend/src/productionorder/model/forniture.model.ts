import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.model';

@Entity('forniture')
export class Forniture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  productionStart: Date;

  @Column()
  containsPurchaseOrder: boolean;

  @Column()
  forecast: Date;

  @Column()
  woodWorker: string;

  @Column()
  deadline: Date;

  @ManyToOne(() => Room, (room) => room.fornitures)
  room: Room;

  constructor(
    name: string,
    productionStart: Date,
    containsPurchaseOrder: boolean,
    forecast: Date,
    woodWorker: string,
    deadline: Date,
    room: Room,
  ) {
    this.name = name;
    this.productionStart = productionStart;
    this.containsPurchaseOrder = containsPurchaseOrder;
    this.forecast = forecast;
    this.woodWorker = woodWorker;
    this.deadline = deadline;
    this.room = room;
  }
}
