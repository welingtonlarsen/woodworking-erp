package com.woordworkerp.model.entity;

import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name="production_order_id")
    private ProductionOrder productionOrder;

    @OneToMany(mappedBy = "room")
    private List<Forniture> fornitures;
}
