package com.woordworkerp.controller;

import com.woordworkerp.dto.ProductionOrderDto;
import com.woordworkerp.model.entity.Client;
import com.woordworkerp.model.entity.ProductionOrder;
import com.woordworkerp.model.service.contract.ProductionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/productionorder")
public class ProductionOrderController {
  @Autowired private ProductionOrderService productionOrderService;

  @PostMapping
  public ResponseEntity<String> create(@RequestBody ProductionOrderDto productionOrderDto) {
    productionOrderService.create(productionOrderDto);
    return ResponseEntity.ok("helloo");
  }
}
