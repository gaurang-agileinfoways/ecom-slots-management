import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { SlotsBuyerService } from './slots-buyer.service';
import { CreateSlotsBuyerDto } from './dto/create-slots-buyer.dto';
import { UpdateSlotsBuyerDto } from './dto/update-slots-buyer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseDto } from 'src/utils/response.dto';

@Controller('buy-slots')
export class SlotsBuyerController {
  constructor(private readonly slotsBuyerService: SlotsBuyerService) { }

  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() createSlotsBuyerDto: CreateSlotsBuyerDto,
    @Req() request,
  ) {
    return new ResponseDto(
      `Hello, ${request.user.fullName}. Your slot is booked successfully.`,
      HttpStatus.ACCEPTED,
      await this.slotsBuyerService.create(
        createSlotsBuyerDto,
        request?.user?._id,
      ),
    );
  }

  @Get()
  async findAll() {
    return await this.slotsBuyerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.slotsBuyerService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSlotsBuyerDto: UpdateSlotsBuyerDto,
  ) {
    return await this.slotsBuyerService.update(+id, updateSlotsBuyerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.slotsBuyerService.remove(+id);
  }
}
