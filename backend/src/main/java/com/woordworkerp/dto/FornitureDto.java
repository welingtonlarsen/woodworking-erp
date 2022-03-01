package com.woordworkerp.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FornitureDto {
    private String name;
    private LocalDate productionStart;
    private Boolean containsPurchaseOrder;
    private LocalDate forecast;
    private String woodWorker;
    private LocalDate deadline;
}
