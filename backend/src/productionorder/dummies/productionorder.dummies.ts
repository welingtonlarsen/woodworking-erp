import {
  ClientDTO,
  FornitureDTO,
  ProductionOrderDTO,
  RoomDTO,
  UpdateProductionOrderDTO,
} from '../dto/request/productionorder.dto';
import { Client } from '../model/client.model';
import { Forniture } from '../model/forniture.model';
import { ProductionOrder } from '../model/productionorder.model';
import { Room } from '../model/room.model';

// Common consts
const date = new Date();

// DTOs
const clientDto = new ClientDTO();
clientDto.name = 'Joseph';

const fornitureDto = new FornitureDTO();
fornitureDto.containsPurchaseOrder = true;
fornitureDto.deadline = date;
fornitureDto.forecast = date;
fornitureDto.name = 'Table';
fornitureDto.productionStart = date;
fornitureDto.woodWorker = 'Wesley';

const roomDto = new RoomDTO();
roomDto.fornitures = [fornitureDto];
roomDto.name = 'Kitchen';

const productionOrderDto = new ProductionOrderDTO();
productionOrderDto.client = clientDto;
productionOrderDto.deadline = date;
productionOrderDto.rooms = [roomDto];
productionOrderDto.start = date;

// Entities
const clientEntity: Client = new Client('Joseph');
clientEntity.id = 1;

const productionOrder: ProductionOrder = new ProductionOrder(
  clientEntity,
  date,
  date,
);
productionOrder.id = 1;

const room: Room = new Room('bathroom', productionOrder);
room.id = 1;

const forniture: Forniture = new Forniture(
  'Table',
  date,
  false,
  date,
  'Wesley',
  date,
  room,
);
forniture.id = 1;

// Set relationships
room.fornitures = [forniture];
productionOrder.rooms = [room];

const update: UpdateProductionOrderDTO = Object.assign(
  { id: 1 },
  productionOrderDto,
) as UpdateProductionOrderDTO;

export {
  date,
  clientDto,
  fornitureDto,
  roomDto,
  productionOrderDto,
  clientEntity,
  productionOrder,
  room,
  forniture,
};
