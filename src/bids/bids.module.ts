import { Module, forwardRef } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BidSchema, Bids } from './schema/bids.schema';
import { ProductsModule } from 'src/products/products.module';
import { SlotsModule } from 'src/slots/slots.module';
import { SlotDetailsModule } from 'src/slot-details/slot-details.module';

@Module({
  controllers: [BidsController],
  providers: [BidsService],
  imports: [
    MongooseModule.forFeature([{ name: Bids.name, schema: BidSchema }]),
    forwardRef(() => ProductsModule),
    forwardRef(() => SlotsModule),
    SlotDetailsModule
  ],
  exports: [BidsService]
})
export class BidsModule { }
