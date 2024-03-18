import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSlotDetailDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  slots: number;
}
