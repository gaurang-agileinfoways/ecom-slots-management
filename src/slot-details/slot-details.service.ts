import { Injectable } from '@nestjs/common';
import { CreateSlotDetailDto } from './dto/create-slot-detail.dto';
import { UpdateSlotDetailDto } from './dto/update-slot-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SlotDetails } from './schema/slot-details.schema';
import { SlotDetails as SlotsDetails } from '../bids/dto/create-bid.dto';

@Injectable()
export class SlotDetailsService {
  constructor(
    @InjectModel(SlotDetails.name) private slotDetailSchema: Model<SlotDetails>,
  ) {}

  async create(createSlotDetailDto: CreateSlotDetailDto[]) {
    return await this.slotDetailSchema.create(createSlotDetailDto);
  }

  async decreaseSlots(slots: SlotsDetails[]) {
    console.log(slots);
    const bulkOperations: any = slots.map(({ slot, quantity }) => ({
      updateOne: {
        filter: { _id: new Types.ObjectId(slot) },
        update: { $inc: { slots: -quantity } },
      },
    }));
    const respp = await this.slotDetailSchema.bulkWrite(bulkOperations);
    console.log(respp);
    return respp;
  }
}
