import { Body, Controller, Get, Post } from '@nestjs/common';
import { StuffService } from './stuff.service';
import { StuffDto } from './stuff.dto';

@Controller('stuff')
export class StuffController {
  constructor(private stuffService: StuffService) {}

  @Get()
  async findAll() {
    return await this.stuffService.findAll();
  }

  @Post()
  async create(@Body() stuffDto: StuffDto) {
    const { name } = stuffDto;
    return await this.stuffService.create(name);
  }
}
