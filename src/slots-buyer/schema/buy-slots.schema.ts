import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Products } from 'src/products/schema/product.schema';
import { Slots } from 'src/slots/schema/slots.schema';
import { Users } from 'src/user/schema/user.schema';

@Schema()
export class BuySlots {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  })
  product: Products;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  buyer: Users;

  @Prop({
    required: true,
    validate: [
      (details: BoughtSlot[]) => {
        Array.isArray(details) && details.length > 0;
      },
      'Enter at least one element',
    ],
  })
  bought_slot: BoughtSlot[];

  @Prop({ required: true })
  total_price: number;
}

class BoughtSlot {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Slots' })
  product: Slots;

  @Prop({ required: true })
  quantity: number;
}

export const BuySlotSchema = SchemaFactory.createForClass(BuySlots);
