import { Module, forwardRef } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotSchema, Slots } from './schema/slots.schema';
import { ProductsModule } from 'src/products/products.module';
import { SlotDetailsModule } from 'src/slot-details/slot-details.module';
import { BidsModule } from 'src/bids/bids.module';

@Module({
  controllers: [SlotsController],
  providers: [SlotsService],
  imports: [
    MongooseModule.forFeature([{ name: Slots.name, schema: SlotSchema }]),
    forwardRef(() => ProductsModule),
    SlotDetailsModule,
    forwardRef(() => BidsModule)
  ],
  exports: [SlotsService],
})
export class SlotsModule { }
