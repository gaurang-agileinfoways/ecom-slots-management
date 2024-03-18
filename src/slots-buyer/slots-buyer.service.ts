import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { CreateSlotsBuyerDto } from './dto/create-slots-buyer.dto';
import { UpdateSlotsBuyerDto } from './dto/update-slots-buyer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BuySlots } from './schema/buy-slots.schema';
import { Model } from 'mongoose';
import { SlotsService } from 'src/slots/slots.service';
import { SlotDetailsService } from 'src/slot-details/slot-details.service';

@Injectable()
export class SlotsBuyerService {

  constructor(
    @InjectModel(BuySlots.name) private buySlotSchema: Model<BuySlots>,
    private readonly slotservice: SlotsService,
    private readonly slotDetailService: SlotDetailsService
  ) { }

  async create(createSlotsBuyerDto: CreateSlotsBuyerDto, userId: string) {
    createSlotsBuyerDto.buyer = userId;
    const product = await this.slotservice.findSlotsByProduct(createSlotsBuyerDto.product);

    product.details.forEach(prod => {
      if (prod.slots <= 0)
        throw new NotAcceptableException(`No slots are available for ${prod.name} package.`)
      createSlotsBuyerDto.bought_slot.forEach(p => {
        if (prod._id.toString() === p.slot && prod.slots < p.quantity) {
          throw new NotAcceptableException(`In ${prod.name} package, only ${prod.slots} slots are available.`)
        }
      })
    })

    const bulkWrite = await this.slotDetailService.decreaseSlots(createSlotsBuyerDto.bought_slot);
    createSlotsBuyerDto.total_price = createSlotsBuyerDto.bought_slot.reduce((ini: number, cur) => {
      return ini + (product.details.find(p => cur.slot.toString() === p._id.toString()).price * cur.quantity);
    }, 0);
    if (bulkWrite.matchedCount === createSlotsBuyerDto.bought_slot.length && bulkWrite.modifiedCount === createSlotsBuyerDto.bought_slot.length)
      return await this.buySlotSchema.create(createSlotsBuyerDto);
    else
      throw new InternalServerErrorException();
  }

  findAll() {
    return `This action returns all slotsBuyer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slotsBuyer`;
  }

  update(id: number, updateSlotsBuyerDto: UpdateSlotsBuyerDto) {
    return `This action updates a #${id} slotsBuyer`;
  }

  remove(id: number) {
    return `This action removes a #${id} slotsBuyer`;
  }
}
