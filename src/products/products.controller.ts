import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Req,
  HttpStatus,
  Put,
  NotAcceptableException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RoleGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.decorator';
import { Roles } from 'src/roles/enums/roles.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ResponseDto } from 'src/utils/response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiBody({ type: CreateProductDto })
  @ApiConsumes('multipart/form-data')
  @UseGuards(RoleGuard)
  @Role(Roles.SELLER)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(
            new NotAcceptableException(
              'File type not match, only jpg,webp,png,jpeg acceptable.',
            ),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = path
            .parse(file.originalname)
            .name.replace(/\s/g, '-');
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}-${Date.now()}${extension}`);
        },
      }),
    }),
  )
  async create(
    @Body('data') requestBody: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    const createProductDto: CreateProductDto =
      typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
    if (!files) throw new BadRequestException('No images provided');

    createProductDto.images = files.map((f) => f.path.toString());
    createProductDto.seller = req.user._id;
    console.log(createProductDto);
    return new ResponseDto(
      'Product added successfully.',
      HttpStatus.CREATED,
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  async findAll() {
    return new ResponseDto(
      'Products retrieve successfully.',
      HttpStatus.OK,
      await this.productsService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      'Product retrieve successfully.',
      HttpStatus.OK,
      await this.productsService.findOne(id),
    );
  }

  @ApiBody({ type: CreateProductDto })
  @ApiConsumes('multipart/form-data')
  @UseGuards(RoleGuard)
  @Role(Roles.SELLER)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(
            new NotAcceptableException(
              'File type not match, only jpg,webp,png,jpeg acceptable.',
            ),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = path
            .parse(file.originalname)
            .name.replace(/\s/g, '-');
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}-${Date.now()}${extension}`);
        },
      }),
    }),
  )
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('data') requestBody: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    const updateProductDto: UpdateProductDto =
      typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;

    updateProductDto.images = files?.map((f) => f.path.toString());
    return new ResponseDto(
      'Product updated successfully.',
      HttpStatus.CREATED,
      await this.productsService.update(id, updateProductDto, req?.user?._id),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      'Product removed successfully.',
      HttpStatus.OK,
      await this.productsService.remove(id),
    );
  }
}
