import { PartialType } from '@nestjs/swagger';
import { CreateSlotDto } from './create-slot.dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateSlotDetailDto } from 'src/slot-details/dto/update-slot-detail.dto';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateSlotDetailDto)
  @IsArray()
  details: UpdateSlotDetailDto[];

  @IsNotEmpty()
  product: string;
}
