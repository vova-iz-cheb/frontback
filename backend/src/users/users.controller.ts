import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto, UserDto, UsersService } from './services/users.service';
import { MyFirstGuard } from 'src/common/guards/my-first.guard';
import { IsNumberString } from 'class-validator';
import { Money, Users } from 'src/common/decorators/users.decorator';
class StringId {
  @IsNumberString()
  id: string;
}

@Controller('users')
@Users(['batyaBIG'])
@Money('big', 'big2')
@UseGuards(MyFirstGuard)
export class UsersController {
  constructor(private usersService: UsersService) {
    console.log('===UsersController===');
  }

  @Get()
  @Users(['batya'])
  @SetMetadata('money', ['SO BIG'])
  // @Header('Cache-Control', 'no-store')
  getUsers() {
    console.log('getUsers');
    // return [];
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
