import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUserName(username);
    if (!user) throw new NotFoundException('User not found!!');

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid credential.');

    return {
      access_token: await this.jwtService.signAsync({
        _id: user._id,
        roles: user.roles,
        fullName: `${user.first_name} ${user.last_name}`,
      }),
    };
  }
}
