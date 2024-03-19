import { PartialType } from '@nestjs/swagger';
import { CreateSlotDetailDto } from './create-slot-detail.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateSlotDetailDto extends PartialType(CreateSlotDetailDto) {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @Optional()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  slots: number;
}
