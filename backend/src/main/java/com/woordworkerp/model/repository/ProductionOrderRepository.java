package com.woordworkerp.model.repository;

import com.woordworkerp.model.entity.ProductionOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, Long> {
}
