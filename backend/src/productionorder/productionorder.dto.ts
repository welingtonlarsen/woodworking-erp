import {
  IsBoolean,
  IsDate,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as moment from 'moment';

class ClientDTO {
  @IsString()
  readonly name: string;
}

export class ProductionOrderDTO {
  @IsObject()
  @Type(() => ClientDTO)
  readonly client: ClientDTO;

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

  @Transform((date) => moment(date.value, 'YYYY-MM-DD').toDate())
  @IsDate()
  productionStart: Date;

  @IsBoolean()
  containsPurchaseOrder: boolean;

  @Transform((date) => moment(date.value, 'YYYY-MM-DD').toDate())
  @IsDate()
  forecast: Date;

  @IsString()
  woodWorker: string;

  @Transform((date) => moment(date.value, 'YYYY-MM-DD').toDate())
  @IsDate()
  deadline: Date;
}
