import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseDto } from 'src/utils/response.dto';

@Controller('bid')
export class BidsController {
  constructor(private readonly bidsService: BidsService) { }

  @UseGuards(AuthGuard)
  @Post('add')
  async create(
    @Body() createBidDto: CreateBidDto,
    @Req() request,
  ) {
    return new ResponseDto(
      `Hello, ${request.user.fullName}. Your slot is booked successfully.`,
      HttpStatus.ACCEPTED,
      await this.bidsService.create(
        createBidDto,
        request?.user?._id,
      ),
    );
  }

  @Get()
  async findAll() {
    return new ResponseDto(
      "Bids retrieved successfully",
      HttpStatus.OK,
      await this.bidsService.findAll()
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      "Bids retrieved successfully",
      HttpStatus.OK,
      await this.bidsService.findOne(id)
    );
  }

  // Not provided in assessment
  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
  //   return this.bidsService.update(+id, updateBidDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.bidsService.remove(+id);
  // }
}
