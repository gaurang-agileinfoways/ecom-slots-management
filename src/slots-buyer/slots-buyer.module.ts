import { Module } from '@nestjs/common';
import { SlotsBuyerService } from './slots-buyer.service';
import { SlotsBuyerController } from './slots-buyer.controller';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BuySlotSchema, BuySlots } from './schema/buy-slots.schema';
import { SlotDetailsModule } from 'src/slot-details/slot-details.module';
import { SlotsModule } from 'src/slots/slots.module';
import { SlotDetails } from './dto/create-slots-buyer.dto';

@Module({
  controllers: [SlotsBuyerController],
  providers: [SlotsBuyerService],
  imports: [
    MongooseModule.forFeature([{ name: BuySlots.name, schema: BuySlotSchema }]),
    ProductsModule,
    SlotsModule,
    SlotDetailsModule,
  ],
})
export class SlotsBuyerModule {}
