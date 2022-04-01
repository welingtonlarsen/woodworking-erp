import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ClientDTO,
  FornitureDTO,
  ProductionOrderDTO,
  RoomDTO,
} from './dto/request/productionorder.dto';
import { ProductionOrderInfo } from './dto/response/productionorderinfo.response.dto';
import { Client } from './model/client.model';
import { Forniture } from './model/forniture.model';
import { ProductionOrder } from './model/productionorder.model';
import { Room } from './model/room.model';
import { ProductionOrderService } from './productionorder.service';
import { ProductionOrderRepositoriesFactory } from './repository/repositoriesfactory.repository';

// Common consts
const date = new Date();

// Mock DTOs
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

// Mock Entities
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
room.fornitures = [forniture]
productionOrder.rooms = [room]

describe('ProductionOrderService', () => {
  let productionOrderService: ProductionOrderService;

  let clientRepository: Repository<Client>;
  let productionOrderRepository: Repository<ProductionOrder>;
  let fornitureRepository: Repository<Forniture>;
  let roomRepository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionOrderService,
        ProductionOrderRepositoriesFactory,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            save: jest.fn().mockResolvedValue(clientEntity),
            create: jest.fn().mockResolvedValue(clientEntity)
          },
        },
        {
          provide: getRepositoryToken(ProductionOrder),
          useValue: {
            save: jest.fn().mockResolvedValue(productionOrder),
            findByIds: jest.fn().mockResolvedValue([productionOrder]),
            find: jest.fn().mockResolvedValue([productionOrder])
          },
        },
        {
          provide: getRepositoryToken(Room),
          useValue: {
            save: jest.fn().mockResolvedValue(room),
          },
        },
        {
          provide: getRepositoryToken(Forniture),
          useValue: {
            save: jest.fn().mockResolvedValue(forniture),
          },
        },
      ],
    }).compile();

    productionOrderService = module.get<ProductionOrderService>(
      ProductionOrderService,
    );
    clientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
    productionOrderRepository = module.get<Repository<ProductionOrder>>(
      getRepositoryToken(ProductionOrder),
    );
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
    fornitureRepository = module.get<Repository<Forniture>>(
      getRepositoryToken(Forniture),
    );
  });

  describe('create', () => {
    it('should create a production order', async () => {
      // Act
      await productionOrderService.create(productionOrderDto);

      // Assert
      expect(fornitureRepository.save).toHaveBeenCalledTimes(1);
      expect(clientRepository.save).toHaveBeenCalledTimes(1);
      expect(productionOrderRepository.save).toHaveBeenCalledTimes(1);
      expect(roomRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a production order', async () => {
      // Act
      const result = await productionOrderService.getById(1);

      // Assert
      expect(result).toBe(productionOrder)
    })
  })

  describe('getAll', () => {
    it('sould return all production orders', async () => {
      // Act
      const result = await productionOrderService.getAll();

      // Assert
      const expectResult = new ProductionOrderInfo(1, 'Joseph', 1, 1, date.valueOf(), date.valueOf(), 0);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expectResult);
    });

    it('should return all production orders when some forniture contains purchase order', async () => {
      // Arrange
      const fornitureWithPurchaseOrder: Forniture = {
        ...forniture,
        containsPurchaseOrder: true
      }
      const roomContainingTheForniture: Room = {
        ...room,
        fornitures: [fornitureWithPurchaseOrder]
      }
      const productionOrderContainingTheRoom: ProductionOrder = {
        ...productionOrder,
        rooms: [roomContainingTheForniture]
      }
      jest.spyOn(productionOrderRepository, 'find').mockResolvedValueOnce([productionOrderContainingTheRoom]);

      // Act
      const result = await productionOrderService.getAll();

      // Assert
      const expectResult = new ProductionOrderInfo(1, 'Joseph', 1, 1, date.valueOf(), date.valueOf(), 100);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expectResult);
    })
  })
});
