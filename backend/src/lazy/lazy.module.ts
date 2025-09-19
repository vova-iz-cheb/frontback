import { Module } from '@nestjs/common';
import { MyLazyController } from './lazy.controller';
import { MyLazyService } from './lazy.service';

@Module({
  controllers: [MyLazyController],
  providers: [MyLazyService],
})
export class MyLazyModule {}
