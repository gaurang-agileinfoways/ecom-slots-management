import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SlotDetailsService } from './slot-details.service';
import { CreateSlotDetailDto } from './dto/create-slot-detail.dto';
import { UpdateSlotDetailDto } from './dto/update-slot-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SlotDetails } from './schema/slot-details.schema';
import { Model } from 'mongoose';

@Controller('slot-details')
export class SlotDetailsController {
  constructor(private readonly slotDetailsService: SlotDetailsService) {}

  // @Post()
  // create(@Body() createSlotDetailDto: CreateSlotDetailDto[]) {
  //   return this.slotDetailsService.create(createSlotDetailDto);
  // }

  // @Get()
  // findAll() {
  //   return this.slotDetailsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.slotDetailsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSlotDetailDto: UpdateSlotDetailDto) {
  //   return this.slotDetailsService.update(+id, updateSlotDetailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.slotDetailsService.remove(+id);
  // }
}
