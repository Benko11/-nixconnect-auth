import { Injectable, UnauthorizedException } from '@nestjs/common';
import { VerifyUserDto } from 'src/users/dto/verify-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async verify(verifyUserDto: VerifyUserDto) {
    const { nickname, password } = verifyUserDto;

    const presumedUser = await this.usersService.findOne(nickname);
    if (presumedUser == null) return false;

    const actualPassword = presumedUser.get('password');
    const passed = await bcrypt.compare(password, actualPassword);
    if (!passed) throw new UnauthorizedException();

    const payload = { nickname };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
