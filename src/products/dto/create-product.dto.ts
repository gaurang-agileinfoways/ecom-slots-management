import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsEmpty()
  images: string[];

  // @ApiProperty({ nullable: true })
  @IsEmpty()
  seller: string;
}
