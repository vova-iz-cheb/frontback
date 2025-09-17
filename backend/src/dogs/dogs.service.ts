import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogService {
  constructor(@InjectRepository(Dog) private dogRepository: Repository<Dog>) {}

  async findAll() {
    const dogs = await this.dogRepository.find();
    console.log('get all dogs', dogs);
    return dogs;
  }

  async findOne(id: number) {
    const dog = await this.dogRepository.findOneBy({ id });
    console.log('get 1 dog', dog);
    if (!dog)
      throw new NotFoundException('Не найдена собака с таким идентификатором!');

    return dog;
  }

  create(dogData: CreateDogDto) {
    const dog = this.dogRepository.create(dogData);
    console.log('create dog', dog);
    return this.dogRepository.save(dog);
  }

  async remove(id: number) {
    const dog = await this.dogRepository.findOneBy({ id });

    if (!dog) throw new NotFoundException();

    await this.dogRepository.remove(dog); // 204
    // return await this.dogRepository.remove(dog); // 200
  }

  async update(id: number, dogData: UpdateDogDto) {
    const dog = await this.dogRepository.findOneBy({ id });

    if (!dog) throw new NotFoundException();

    if (dogData.name) dog.name = dogData.name;
    if (dogData.size) dog.size = dogData.size;

    return await this.dogRepository.save(dog);
  }
}
