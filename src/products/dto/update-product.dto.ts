import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmpty,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  @ApiProperty()
  @IsOptional()
  @IsString()
  product_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsEmpty()
  images: string[];
}
