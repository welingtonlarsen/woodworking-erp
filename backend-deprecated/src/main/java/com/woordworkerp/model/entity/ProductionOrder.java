package com.woordworkerp.model.entity;

import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
public class ProductionOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="client_id")
    private Client client;

    @OneToMany(mappedBy = "productionOrder")
    private List<Room> rooms;

}
