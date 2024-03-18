import { PartialType } from '@nestjs/swagger';
import { CreateSlotsBuyerDto } from './create-slots-buyer.dto';

export class UpdateSlotsBuyerDto extends PartialType(CreateSlotsBuyerDto) {}
