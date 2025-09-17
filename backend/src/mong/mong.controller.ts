import { Body, Controller, Get, Post } from '@nestjs/common';
import { MongService } from './mong.service';

@Controller('mong')
export class MongController {
  constructor(private service: MongService) {}
  @Get()
  getMong() {
    return this.service.getHandler();
  }

  @Post()
  create(@Body() cat: any) {
    return this.service.create(cat);
  }
}
