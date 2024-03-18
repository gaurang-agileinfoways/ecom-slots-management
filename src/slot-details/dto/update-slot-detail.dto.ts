import { PartialType } from '@nestjs/swagger';
import { CreateSlotDetailDto } from './create-slot-detail.dto';

export class UpdateSlotDetailDto extends PartialType(CreateSlotDetailDto) {}
