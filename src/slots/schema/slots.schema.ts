import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Products } from 'src/products/schema/product.schema';
import { SlotDetails } from 'src/slot-details/schema/slot-details.schema';
import { Users } from 'src/user/schema/user.schema';

@Schema()
export class Slots {
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SlotDetails' }],
    validate: [
      (details: SlotDetails[]) => {
        return Array.isArray(details) && details.length > 0;
      },
      'Enter at least one element',
    ],
  })
  details: SlotDetails[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  })
  product: Products;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  slot_creator: Users;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: null })
  winner: Users;
}

export const SlotSchema = SchemaFactory.createForClass(Slots);
