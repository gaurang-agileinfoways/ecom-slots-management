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
  Query,
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
  constructor(private readonly slotsService: SlotsService) { }

  @UseGuards(RoleGuard)
  @Role(Roles.SELLER)
  @Post()
  async create(@Body() createSlotDto: CreateSlotDto, @Req() request) {
    return new ResponseDto(
      'slots added successfully.',
      HttpStatus.CREATED,
      await this.slotsService.create(createSlotDto, request?.user?._id),
    );
  }

  @Get()
  async findAll() {
    return new ResponseDto(
      'slots retrieved successfully.',
      HttpStatus.OK,
      await this.slotsService.findAll(),
    );
  }

  @UseGuards(RoleGuard)
  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get('get-winner')
  async findWinner(@Query('id') id: string) {
    const response = await this.slotsService.findWinner(id);
    return new ResponseDto(
      `Congratulations, The winner is ${response.winner.first_name} ${response.winner.last_name}.`,
      HttpStatus.OK,
      response
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slotsService.remove(id);
  }

}
