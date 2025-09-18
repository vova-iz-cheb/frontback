import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { Prisma, dog as DogFromPrisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog) private dogRepository: Repository<Dog>,
    private prisma: PrismaService,
  ) {}

  async findAll() {
    const dogs = await this.dogRepository.find();
    console.log('get all dogs', dogs);

    const prismaDogs = await this.prisma.dog.findMany();
    console.log('get all prismaDogs', prismaDogs);
    return dogs;
  }

  async findOne(id: number) {
    const dog = await this.dogRepository.findOneBy({ id });
    console.log('get 1 dog', dog);
    if (!dog)
      throw new NotFoundException('Не найдена собака с таким идентификатором!');

    const prismaDog = await this.prisma.dog.findUnique({ where: { id } });

    console.log('get 1 prismaDog', prismaDog);

    return dog;
  }

  async create(dogData: CreateDogDto) {
    const dog = this.dogRepository.create(dogData);
    console.log('create dog', dog);

    const result = await this.prisma.dog.create({
      data: dogData,
    });

    console.log('create dog prisma', result);

    return this.dogRepository.save(dog);
  }

  async remove(id: number) {
    const dog = await this.dogRepository.findOneBy({ id });

    if (!dog) throw new NotFoundException();

    const r = await this.prisma.dog.delete({
      where: { id },
    });

    console.log('delete r', r);

    // await this.dogRepository.remove(dog); // 204
    // return await this.dogRepository.remove(dog); // 200
  }

  async update(id: number, dogData: UpdateDogDto) {
    const dog = await this.dogRepository.findOneBy({ id });

    if (!dog) throw new NotFoundException();

    return await this.prisma.dog.update({
      where: { id },
      data: dogData,
    });

    // if (dogData.name) dog.name = dogData.name;
    // if (dogData.size) dog.size = dogData.size;

    // return await this.dogRepository.save(dog);
  }
}
