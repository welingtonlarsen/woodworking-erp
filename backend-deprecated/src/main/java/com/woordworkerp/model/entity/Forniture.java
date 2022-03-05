package com.woordworkerp.model.entity;

import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
public class Forniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate productionStart;

    private Boolean containsPurchaseOrder;

    private LocalDate forecast;

    private String woodWorker;

    private LocalDate deadline;

    @ManyToOne
    @JoinColumn(name="room_id")
    private Room room;
}
