import { Module } from '@nestjs/common';
import { SlotDetailsService } from './slot-details.service';
import { SlotDetailsController } from './slot-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotDetailSchema, SlotDetails } from './schema/slot-details.schema';

@Module({
  controllers: [SlotDetailsController],
  providers: [SlotDetailsService],
  imports: [
    MongooseModule.forFeature([
      { name: SlotDetails.name, schema: SlotDetailSchema },
    ]),
  ],
  exports: [SlotDetailsService],
})
export class SlotDetailsModule {}
