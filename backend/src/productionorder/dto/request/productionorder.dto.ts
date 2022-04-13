import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
// import * as moment from 'moment';

export class ClientDTO {
  @IsString()
  name: string;
}

export class ProductionOrderDTO {
  @IsObject()
  @Type(() => ClientDTO)
  client: ClientDTO;

  @Transform((date) => new Date(date.value))
  @IsNotEmpty()
  start: Date;

  @Transform((date) => new Date(date.value))
  @IsNotEmpty()
  deadline: Date;

  @ValidateNested({ each: true })
  @Type(() => RoomDTO)
  rooms: RoomDTO[];
}

export class UpdateProductionOrderDTO extends ProductionOrderDTO {
  @IsNumber()
  id: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateRoomDTO)
  rooms: UpdateRoomDTO[];
}

export class RoomDTO {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => FornitureDTO)
  fornitures: FornitureDTO[];
}

export class UpdateRoomDTO extends RoomDTO {
  @IsNumber()
  id: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateFornitureDTO)
  fornitures: UpdateFornitureDTO[];
}

export class FornitureDTO {
  @IsString()
  name: string;

  @Transform((date) => new Date(date.value))
  @IsNotEmpty()
  productionStart: Date;

  @IsBoolean()
  containsPurchaseOrder: boolean;

  @Transform((date) => new Date(date.value))
  @IsNotEmpty()
  forecast: Date;

  @IsString()
  woodWorker: string;

  @Transform((date) => new Date(date.value))
  @IsNotEmpty()
  deadline: Date;
}

export class UpdateFornitureDTO extends FornitureDTO {
  @IsNumber()
  id: number;
}
