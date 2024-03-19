import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Products } from 'src/products/schema/product.schema';
import { SlotDetails } from 'src/slot-details/schema/slot-details.schema';
import { Slots } from 'src/slots/schema/slots.schema';
import { Users } from 'src/user/schema/user.schema';

@Schema()
export class Bids {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  })
  product: Products;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slots'
  })
  slot: Slots;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  buyer: Users;

  @Prop({
    required: true,
    validate: [
      (details: BidingSlot[]) => {
        Array.isArray(details) && details.length > 0;
      },
      'Enter at least one element',
    ],
  })
  bid_slots: BidingSlot[];

  @Prop({ required: true })
  total_price: number;
}

class BidingSlot {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'SlotDetails' })
  slot: SlotDetails;

  @Prop({ required: true })
  quantity: number;
}

export const BidSchema = SchemaFactory.createForClass(Bids);
