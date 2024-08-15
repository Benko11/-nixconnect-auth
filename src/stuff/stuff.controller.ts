import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = this.stuffService.findById(id);
    console.log(data);
    return data;
  }
}
