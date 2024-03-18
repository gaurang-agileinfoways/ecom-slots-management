import { Type } from 'class-transformer';
import { IsArray, IsEmpty, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateSlotDetailDto } from 'src/slot-details/dto/create-slot-detail.dto';

export class CreateSlotDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSlotDetailDto)
  @IsArray()
  details: CreateSlotDetailDto[];

  @IsNotEmpty()
  product: string;

  @IsEmpty()
  slot_creator: string;
}
