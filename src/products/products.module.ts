import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Products } from './schema/product.schema';
import { SlotsModule } from 'src/slots/slots.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
    forwardRef(() => SlotsModule),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
