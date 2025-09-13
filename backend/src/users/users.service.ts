import { Injectable, NotFoundException } from '@nestjs/common';

export class UserDto {
  id: string;
  name: string;
  isAdmin: boolean;
}

export class UpdateUserDto {
  name?: string;
  isAdmin?: boolean;
}

@Injectable()
export class UsersService {
  private users: UserDto[] = [];

  getUserById(id: string) {
    const user = this.users.find((x) => x.id === id);

    if (user) return user;

    throw new NotFoundException();
  }

  getUsers() {
    return this.users;
  }

  createUser(user: UserDto) {
    this.users.push(user);
    return user;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((x) => x.id === id);

    if (~index) {
      const user = this.users[index];

      this.users.splice(index, 1);

      return user;
    } else {
      throw new NotFoundException();
    }
  }

  changeUser(id: string, data: UpdateUserDto) {
    const user = this.users.find((x) => x.id === id);

    if (!user) throw new NotFoundException();

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.isAdmin === 'boolean') {
      user.isAdmin = data.isAdmin;
    }

    return user;
  }
}
