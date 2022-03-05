package com.woordworkerp.model.entity;

import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy="client")
    private List<ProductionOrder> productionOrders;
}
