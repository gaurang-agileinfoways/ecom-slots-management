import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateSlotsBuyerDto {
  @IsOptional()
  buyer: string;

  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SlotDetails)
  @IsArray()
  bought_slot: SlotDetails[];

  @IsOptional()
  total_price: number;
}

export class SlotDetails {
  @IsNotEmpty()
  @IsString()
  slot: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
