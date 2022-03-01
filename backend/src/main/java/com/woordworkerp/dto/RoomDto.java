package com.woordworkerp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RoomDto {
    private String name;
    private List<FornitureDto> fornitures;
}
