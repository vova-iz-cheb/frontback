import { Controller, Get } from '@nestjs/common';
import { MyLazyService } from './lazy.service';

@Controller('lazy')
export class MyLazyController {
  constructor(private service: MyLazyService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
