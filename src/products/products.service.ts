import { Inject, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/product.schema';
import { Model } from 'mongoose';
import { SlotsService } from 'src/slots/slots.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productSchema: Model<Products>,
    @Inject(forwardRef(() => SlotsService))
    private slotService: SlotsService
  ) { }

  async create(createProductDto: CreateProductDto) {
    return await this.productSchema.create(createProductDto);
  }

  async findAll() {
    const products = await this.productSchema.find().populate('seller').exec();
    if (products.length) return products;
    else throw new NotFoundException('products not found');
  }

  async findOne(_id: string) {
    const product = await this.productSchema.findById(_id);
    if (product) return product;
    else throw new NotFoundException('product not found');
  }

  async update(_id: string, updateProductDto: UpdateProductDto, userId: string) {

    const slot = await this.slotService.findSlotsByProduct(_id);

    if (slot && updateProductDto.price)
      throw new NotAcceptableException("After slot create, you can not change price.")

    const product = await this.productSchema.findById(_id);
    if (product.seller._id !== userId) throw new UnauthorizedException('You can not update anoter seller\'s product.');

    if (product) {
      updateProductDto?.images?.length === 0 ? delete updateProductDto.images : updateProductDto.images = [...updateProductDto.images, ...product.images]
      if (updateProductDto?.images?.length > 10) throw new NotAcceptableException("you can enter only 10 images per product");

      if (await this.productSchema.findByIdAndUpdate(_id, updateProductDto))
        return this.findOne(product._id.toString());
      else throw new InternalServerErrorException();

    } else throw new NotFoundException('product not found');
  }

  async remove(_id: string) {
    const product = await this.productSchema.findById(_id);
    if (product) {
      return await this.productSchema.findByIdAndDelete(_id);
    } else throw new NotFoundException('product not found');
  }
}
