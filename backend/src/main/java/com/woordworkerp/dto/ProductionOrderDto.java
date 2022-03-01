package com.woordworkerp.dto;

import com.woordworkerp.model.entity.Client;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductionOrderDto {
    private ClientDto client;
    private List<RoomDto> rooms;
}
