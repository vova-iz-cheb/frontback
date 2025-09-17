import { Inject, Injectable } from '@nestjs/common';
import { Cat, CatDocument } from './mong.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class MongService {
  // constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  getHandler() {
    return 'hello';
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    console.log('createCatDto', createCatDto);
    const createdCat = new this.catModel(createCatDto);

    // createdCat.save123();

    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
