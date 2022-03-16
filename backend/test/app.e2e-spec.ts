import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProductionOrderService } from 'src/productionorder/productionorder.service';
import { ProductionOrderRepositoriesFactory } from 'src/productionorder/repository/repositoriesfactory.repository';
import { Client } from 'src/productionorder/model/client.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});


describe('ProductionOrderService', async () => {
  let productionOrderService: ProductionOrderService;
  let repositories: ProductionOrderRepositoriesFactory;

  beforeEach(() => {
    const client = new Client('Jose');
    client.id = 1;
    client.productionOrders = [];

    const promise = new Promise<Client>((resolve, reject) => {
      resolve(client);
    });

    jest
      .spyOn(repositories.clientRepository, 'save')
      .mockImplementation(() => promise);
    productionOrderService = new ProductionOrderService(repositories);
  });

  it('hello world', async () => {
    const result = await repositories.clientRepository.save(new Client('Jose'));
    console.log(result);
    expect(result).toBe('');
  });
});
