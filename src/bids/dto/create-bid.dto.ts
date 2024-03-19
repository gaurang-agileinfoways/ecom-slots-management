import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SlotDetails {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slot: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateBidDto {
  @IsOptional()
  buyer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slot: string;

  @ApiProperty({ type: [SlotDetails] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SlotDetails)
  @IsArray()
  bid_slots: SlotDetails[];

  @IsOptional()
  total_price: number;
}
