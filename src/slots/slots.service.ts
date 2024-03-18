import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Slots } from './schema/slots.schema';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { SlotDetailsService } from 'src/slot-details/slot-details.service';

@Injectable()
export class SlotsService {
  constructor(
    @InjectModel(Slots.name) private slotSchema: Model<Slots>,
    private readonly productService: ProductsService,
    private readonly slotDetailServce: SlotDetailsService,
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
      .populate(['details', 'product', 'slot_creator'])
      .exec();
  }

  async findAll() {
    return await this.slotSchema.find().populate('details').exec();
  }

  async findOne(_id: string) {
    return await this.slotSchema.findById(_id).populate('details').exec();
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
