import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Slots } from './schema/slots.schema';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { SlotDetailsService } from 'src/slot-details/slot-details.service';
import { BidsService } from 'src/bids/bids.service';

@Injectable()
export class SlotsService {

  constructor(
    @InjectModel(Slots.name) private slotSchema: Model<Slots>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,
    private readonly slotDetailServce: SlotDetailsService,
    @Inject(forwardRef(() => BidsService)) private bidService: BidsService
  ) { }

  async create(createSlotDto: CreateSlotDto, id: string) {
    createSlotDto.slot_creator = id;
    const product = await this.productService.findOne(createSlotDto.product);
    if (!product) throw new NotFoundException('Product not found.');

    const slots = await this.findSlotsByProduct(createSlotDto.product);
    if (slots)
      throw new NotAcceptableException(
        'Slots already available of given product',
      );

    const total = createSlotDto.details.reduce((prev: number, curr) => {
      return prev + curr.price * curr.slots;
    }, 0);
    console.log('total => ', total, product.price, createSlotDto);

    if (product.price === total) {
      const details = (
        await this.slotDetailServce.create(createSlotDto.details)
      ).map((d) => d._id);
      const data = { ...createSlotDto, details };
      console.log(data);
      return (await this.slotSchema.create(data)).populate('details');
    } else {
      throw product.price > total
        ? new NotAcceptableException(
          'Your total slot prices are lower than product price',
        )
        : new NotAcceptableException(
          'Your total slot prices are heigher than product price',
        );
    }
  }

  async findSlotsByProduct(proudct: string) {
    return await this.slotSchema
      .findOne({ product: proudct })
      .populate(['details', 'product', 'slot_creator', 'winner'])
      .exec();
  }

  async findAll() {
    return await this.slotSchema.find()
      .populate('details').exec();
  }

  async findOne(_id: string) {
    return await this.slotSchema.findById(_id)
      .populate(['details', 'winner', 'slot_creator', 'product']).exec();
  }

  update(id: string, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }

  async findWinner(id: string) {
    const slot = await this.slotSchema.findById(id);

    if (slot.winner !== null) throw new NotAcceptableException('Winner already choosen.');
    if (!slot.isActive) throw new NotAcceptableException('Sorry, this event is ended.');

    const slots = await this.bidService.findByProduct(slot.product._id.toString());
    const userArray = []
    slots.forEach(slot => {
      for (let i = 0; i < slot.total_price; i++)
        userArray.push(slot.buyer)
    })
    const random = Math.round(Math.random() * userArray.length);
    const winner = await this.slotSchema.findByIdAndUpdate(slot._id, { winner: userArray[random], isActive: false });
    if (winner) return await this.findOne(slot._id.toString());
    else throw new InternalServerErrorException();
  }
}
