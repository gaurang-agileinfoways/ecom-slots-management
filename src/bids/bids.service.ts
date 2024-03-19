import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bids } from './schema/bids.schema';
import { Model } from 'mongoose';
import { SlotsService } from 'src/slots/slots.service';
import { SlotDetailsService } from 'src/slot-details/slot-details.service';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(Bids.name) private bidschema: Model<Bids>,
    @Inject(forwardRef(() => SlotsService))
    private readonly slotservice: SlotsService,
    private readonly slotDetailService: SlotDetailsService,
  ) {}

  async create(createBidDto: CreateBidDto, userId: string) {
    createBidDto.buyer = userId;
    const product = await this.slotservice.findSlotsByProduct(
      createBidDto.product,
    );
    if (!product)
      throw new NotFoundException('There are no slots in this products');

    createBidDto.bid_slots.forEach((p) => {
      let isAvailable = false;
      product?.details?.forEach((prod) => {
        if (prod.slots <= 0)
          throw new NotAcceptableException(
            `No slots are available for ${prod.name} package.`,
          );
        console.log(prod._id.toString(), p.slot);
        if (prod._id.toString() === p.slot) {
          isAvailable = true;
          if (prod.slots < p.quantity)
            throw new NotAcceptableException(
              `In ${prod.name} package, only ${prod.slots} slots are available.`,
            );
        }
      });
      if (!isAvailable) throw new NotFoundException(`${p.slot} not found.`);
    });

    const bulkWrite = await this.slotDetailService.decreaseSlots(
      createBidDto.bid_slots,
    );

    createBidDto.total_price = createBidDto.bid_slots.reduce(
      (initial: number, current) => {
        return (
          initial +
          product.details.find(
            (p) => current.slot.toString() === p._id.toString(),
          ).price *
            current.quantity
        );
      },
      0,
    );
    if (
      bulkWrite.matchedCount === createBidDto.bid_slots.length &&
      bulkWrite.modifiedCount === createBidDto.bid_slots.length
    )
      return await this.bidschema.create(createBidDto);
    else throw new InternalServerErrorException();
  }

  async findAll() {
    return await this.bidschema
      .find()
      .populate({
        path: 'bid_slots.slot',
        model: 'SlotDetails',
      })
      .populate(['buyer', 'product']);
  }

  async findOne(id: string) {
    return await this.bidschema
      .findById(id)
      .populate({
        path: 'bid_slots.slot',
        model: 'SlotDetails',
      })
      .populate(['buyer', 'product']);
  }

  async update(id: number, updateBidDto: UpdateBidDto) {
    return await `This action updates a #${id} bid`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} bid`;
  }

  async findByProduct(id: string) {
    return await this.bidschema.find({ product: id });
  }

  async findBySlotId(id: string) {
    return await this.bidschema.find({ slot: id });
  }
}
