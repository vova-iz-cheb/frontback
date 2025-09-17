import {
  Body,
  Delete,
  Get,
  Controller,
  Patch,
  Post,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { DogService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogService) {}

  @Post()
  create(@Body() dogData: CreateDogDto) {
    return this.dogsService.create(dogData);
  }

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dogData: UpdateDogDto) {
    return this.dogsService.update(id, dogData);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dogsService.remove(id);
  }
}
