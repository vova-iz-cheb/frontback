import { Injectable, Module } from '@nestjs/common';
import { MongController } from './mong.controller';
import { MongService } from './mong.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './mong.shema';
import { ModuleA } from './mongA.module';

@Injectable()
class ServiceB {}

@Module({
  imports: [ModuleA],
  providers: [ServiceB],
})
export class ModuleB {}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    ModuleB,
  ],
  providers: [MongService],
  controllers: [MongController],
})
export class MongModule {}
