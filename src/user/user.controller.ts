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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ResponseDto } from 'src/utils/response.dto';
import { RoleGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/enums/roles.enum';
import { Role } from 'src/roles/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @ApiBearerAuth('access_token')
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

  @ApiBearerAuth('access_token')
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

  @ApiBearerAuth('access_token')
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard)
  @Put('')
  async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new ResponseDto(
      'user updated successfully.',
      HttpStatus.OK,
      await this.userService.update(id, updateUserDto),
    );
  }

  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return new ResponseDto(
      'user removed successfully.',
      HttpStatus.OK,
      this.userService.remove(id),
    );
  }

  @ApiBearerAuth('access_token')
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
