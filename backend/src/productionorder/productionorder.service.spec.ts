import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ClientDTO,
  FornitureDTO,
  ProductionOrderDTO,
  RoomDTO,
} from './dto/request/productionorder.dto';
import { Client } from './model/client.model';
import { Forniture } from './model/forniture.model';
import { ProductionOrder } from './model/productionorder.model';
import { Room } from './model/room.model';
import { ProductionOrderService } from './productionorder.service';
import { ProductionOrderRepositoriesFactory } from './repository/repositoriesfactory.repository';

// Mock DTOs
const clientDto = new ClientDTO();
clientDto.name = 'Joseph';

const fornitureDto = new FornitureDTO();
fornitureDto.containsPurchaseOrder = true;
fornitureDto.deadline = new Date();
fornitureDto.forecast = new Date();
fornitureDto.name = 'Table';
fornitureDto.productionStart = new Date();
fornitureDto.woodWorker = 'Wesley';

const roomDto = new RoomDTO();
roomDto.fornitures = [fornitureDto];
roomDto.name = 'Kitchen';

const productionOrderDto = new ProductionOrderDTO();
productionOrderDto.client = clientDto;
productionOrderDto.deadline = new Date();
productionOrderDto.rooms = [roomDto];
productionOrderDto.start = new Date();

// Mock Entities
const clientEntity: Client = new Client('Joseph');
clientEntity.id = 1;

const productionOrder: ProductionOrder = new ProductionOrder(
  clientEntity,
  new Date(),
  new Date(),
);
productionOrder.id = 1;

const room: Room = new Room('bathroom', productionOrder);
room.id = 1;

const forniture: Forniture = new Forniture(
  'Table',
  new Date(),
  false,
  new Date(),
  'Wesley',
  new Date(),
  room,
);
forniture.id = 1;

describe('ProductionOrderService', () => {
  let productionOrderService: ProductionOrderService;
  let repositories: ProductionOrderRepositoriesFactory;

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
          },
        },
        {
          provide: getRepositoryToken(ProductionOrder),
          useValue: {
            save: jest.fn().mockResolvedValue(productionOrder),
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

    // repositories = module.get<ProductionOrderRepositoriesFactory>(
    //   ProductionOrderRepositoriesFactory,
    // );

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

  describe('Hello World', () => {
    it('should say hello', () => {
      expect('hello').toBe('hello');
    });
  });
});
