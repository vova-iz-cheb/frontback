import {
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService, type ConfigType } from '@nestjs/config';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import databaseConfig from 'config/database.config';
import { symbolValue } from 'src/shared/shared.module';
import { Helper1 } from 'src/shared/shared.services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export class UserDto {
  @IsNumberString()
  id: string;

  @IsString()
  @IsNotEmpty({
    message: 'Поле "name" не должно быть пустым.',
  })
  // @MinLength(4)
  // @MaxLength(12)
  name: string;

  @IsBoolean()
  isAdmin: boolean;
}

// export class UpdateUserDto {
//   name?: string;
//   isAdmin?: boolean;
// }

export class UpdateUserDto extends PartialType(OmitType(UserDto, ['id'])) {
  @ValidateIf(() => false) // отключает старые валидаторы
  @MinLength(4)
  name?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private helper1: Helper1,
    @Inject('BLAH') private readonly blah: Helper1,
    @Inject(symbolValue) private readonly hello: any,
    private configService: ConfigService<{
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      http: {
        host: string;
      };
      'http.host': string;
    }>,

    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {}

  onModuleInit() {
    console.log(
      'DATABASE_USER:',
      this.configService.get<string>('DATABASE_USER'),
    );
    console.log(
      'DATABASE_PASSWORD:',
      this.configService.get<string>('DATABASE_PASSWORD'),
    );
    // console.log(
    //   'TEST_CHECK_1:',
    //   this.configService.get<string>('TEST_CHECK_1'),
    // );
    // console.log('DATABASE_USER:', process.env.DATABASE_USER);
    // console.log('DATABASE_USER:', process.env.TEST_CHECK_1);
    // console.log('database:', this.configService.get<string>('database'));
    // console.log('host:', this.configService.get<string>('database.host'));
    const r = this.configService.get('http.host', 'local', {
      infer: true,
    });
    console.log('http host:', r);
    console.log('PORT:', typeof process.env.PORT, process.env.PORT);
    console.log('dbConfig:', this.dbConfig);
  }

  private users: UserDto[] = [];

  getUserById(id: string) {
    const user = this.users.find((x) => x.id === id);

    if (user) return user;

    throw new NotFoundException();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async getUsers() {
    console.log('1', this.helper1.getValue());
    // console.log('12', this.blah.getValue());
    // console.log('123', this.hello.getHello());
    // console.log('configService', this.configService.get('DATABASE_USER'));
    // return this.users;

    const r = await this.usersRepository.find();
    console.log('r', r);
    return r;
  }

  async createUser(user: UserDto) {
    console.log('===user', user);
    this.users.push(user);

    const user1 = this.usersRepository.create({
      firstName: 'asdf',
      lastName: user.name,
      isActive: true,
    });

    await this.usersRepository.save(user1);
    return user1;
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
