import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({ type: LoginDto })
  @Post('login')
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto.user_name, loginDto.password);
  }
}
