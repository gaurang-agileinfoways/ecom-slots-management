import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { ResponseDto } from 'src/utils/response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.decorator';
import { Roles } from 'src/roles/enums/roles.enum';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createSlotDto: CreateSlotDto, @Req() request: any) {
    return new ResponseDto(
      'slots added successfully.',
      HttpStatus.CREATED,
      await this.slotsService.create(createSlotDto, request?.user?._id),
    );
  }

  @UseGuards(RoleGuard)
  @Role(Roles.ADMIN)
  @Get()
  async findAll() {
    return new ResponseDto(
      'slots retrieved successfully.',
      HttpStatus.OK,
      await this.slotsService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      'slot retrieved successfully.',
      HttpStatus.OK,
      await this.slotsService.findOne(id),
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotsService.update(+id, updateSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slotsService.remove(+id);
  }
}
