import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { VerifyUserDto } from 'src/users/dto/verify-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async verify(@Body() verifyUserDto: VerifyUserDto) {
    return await this.authService.verify(verifyUserDto);
  }

  @Get('secret')
  @UseGuards(AuthGuard)
  secretArea() {
    return 'this is very secret';
  }
}
