import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as crypto from 'crypto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  makeStuff() {
    return crypto.randomBytes(100).toString('base64url');
  }
}
