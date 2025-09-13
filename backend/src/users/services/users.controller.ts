import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UpdateUserDto, UserDto, UsersService } from '../users.service';
import { MyFirstExceptionFilter } from 'src/common/filters/my-first.filter';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    throw new Error('faldfjalks');
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  changeUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.changeUser(id, data);
  }
}
