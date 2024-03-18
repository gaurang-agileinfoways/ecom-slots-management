import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productSchema: Model<Products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productSchema.create(createProductDto);
  }

  async findAll() {
    const products = await this.productSchema.find().populate('seller').exec();
    if (products) return products;
    else throw new NotFoundException('products not found');
  }

  async findOne(_id: string) {
    const product = await this.productSchema.findById(_id);
    if (product) return product;
    else throw new NotFoundException('product not found');
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productSchema.findById(_id);
    if (product) {
      return await this.productSchema.findByIdAndUpdate(_id, updateProductDto);
    } else throw new NotFoundException('product not found');
  }

  async remove(_id: string) {
    const product = await this.productSchema.findById(_id);
    if (product) {
      return await this.productSchema.findByIdAndDelete(_id);
    } else throw new NotFoundException('product not found');
  }
}
