import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/utils/response.dto';
import { RoleGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/enums/roles.enum';
import { Role } from 'src/roles/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new ResponseDto(
      'user created successfully.',
      HttpStatus.CREATED,
      await this.userService.create(createUserDto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Role(Roles.ADMIN)
  @Get()
  async findAll() {
    return new ResponseDto(
      'users retrieved successfully.',
      HttpStatus.OK,
      await this.userService.findAll(),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Role(Roles.ADMIN)
  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      'user retrieved successfully.',
      HttpStatus.OK,
      await this.userService.findOne(id),
    );
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard)
  @Put('')
  async update(
    @Query('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ) {
    return new ResponseDto(
      'user updated successfully.',
      HttpStatus.OK,
      await this.userService.update(id, updateUserDto, request.user._id),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      'user removed successfully.',
      HttpStatus.OK,
      await this.userService.remove(id),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('users')
  async findByUserName(@Query('username') user_name: string) {
    return new ResponseDto(
      'user retrieved successfully.',
      HttpStatus.OK,
      await this.userService.findByUserName(user_name),
    );
  }
}
