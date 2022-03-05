package com.woordworkerp.model.service.implementation;

import com.woordworkerp.dto.ProductionOrderDto;
import com.woordworkerp.model.entity.Client;
import com.woordworkerp.model.entity.Forniture;
import com.woordworkerp.model.entity.ProductionOrder;
import com.woordworkerp.model.entity.Room;
import com.woordworkerp.model.repository.ClientRepository;
import com.woordworkerp.model.repository.FurnitureRepository;
import com.woordworkerp.model.repository.ProductionOrderRepository;
import com.woordworkerp.model.repository.RoomRepository;
import com.woordworkerp.model.service.contract.ProductionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductionOrderServiceImpl implements ProductionOrderService {
  @Autowired private ClientRepository clientRepository;

  @Autowired private ProductionOrderRepository productionOrderRepository;

  @Autowired private RoomRepository roomRepository;

  @Autowired private FurnitureRepository furnitureRepository;

  @Override
  public void create(ProductionOrderDto productionOrderDto) {
    var client = new Client(null, productionOrderDto.getClient().getName(), null);
    clientRepository.save(client);

    var productionOrder = new ProductionOrder(null, client, null);
    productionOrderRepository.save(productionOrder);

    productionOrderDto
        .getRooms()
        .forEach(
            roomDto -> {
              var room = new Room(null, roomDto.getName(), productionOrder, null);
              roomRepository.save(room);

              var furnitures =
                  roomDto.getFornitures().stream()
                      .map(
                          furnitureDto ->
                              new Forniture(
                                  null,
                                  furnitureDto.getProductionStart(),
                                  furnitureDto.getContainsPurchaseOrder(),
                                  furnitureDto.getForecast(),
                                  furnitureDto.getWoodWorker(),
                                  furnitureDto.getDeadline(),
                                  room))
                      .toList();
              furnitureRepository.saveAll(furnitures);
            });
  }
}
