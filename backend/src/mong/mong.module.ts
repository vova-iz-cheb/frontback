import { Module } from '@nestjs/common';
import { MongController } from './mong.controller';
import { MongService } from './mong.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './mong.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [MongService],
  controllers: [MongController],
})
export class MongModule {}
