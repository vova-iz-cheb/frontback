import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto, UserDto, UsersService } from '../users.service';
import { MyFirstExceptionFilter } from 'src/common/filters/my-first.filter';
import { MyFirstGuard } from 'src/common/guards/my-first.guard';
import { IsNumberString } from 'class-validator';
class StringId {
  @IsNumberString()
  id: string;
}

@Controller('users')
@UseGuards(MyFirstGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    console.log('getUsers');
    // getUsers(@Query('sort', ParseBoolPipe) sort?: boolean) {
    // throw new Error('faldfjalks');
    // console.log('sort', sort, typeof sort);
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
  deleteUser(@Param() param: StringId) {
    // works
    return this.usersService.deleteUser(param.id);
  }

  @Patch(':id')
  changeUser(@Param('id') id: StringId['id'], @Body() data: UpdateUserDto) {
    // doent work validation
    return this.usersService.changeUser(id, data);
  }
}
