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

class ClientDTO {
  @IsString()
  readonly name: string;
}

export class ProductionOrderDTO {
  @IsObject()
  @Type(() => ClientDTO)
  readonly client: ClientDTO;

  @Transform((date) => new Date(date.value))
  @IsNotEmpty()
  readonly start: Date

  @Transform((date) => new Date(date.value))
  @IsNotEmpty()
  readonly deadline: Date

  @ValidateNested({ each: true })
  @Type(() => RoomDTO)
  rooms: RoomDTO[];
}

export class RoomDTO {
  @IsString()
  name: string;
  
  @ValidateNested({ each: true })
  @Type(() => FornitureDTO)
  fornitures: FornitureDTO[];
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
