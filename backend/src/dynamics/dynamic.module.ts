import {
  DynamicModule,
  forwardRef,
  Inject,
  Injectable,
  Module,
  Scope,
} from '@nestjs/common';
import path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { PostsModule } from 'src/posts/posts.module';

@Module({})
export class MyDynamicModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      // global: true,
      // module: MyDynamicModule,
      module: FirstModule,
      providers: [
        FirstService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [FirstService],
    };
  }
}

@Injectable({ scope: Scope.DEFAULT })
export class FirstService {
  private readonly envConfig: Record<string, any>;

  constructor(
    @Inject('CONFIG_OPTIONS') private configOptions: Record<string, any>,
  ) {
    console.log('===FirstService===');
    // const options = { folder: './config' };
    const options = configOptions;

    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    // console.log('filePath', filePath);

    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    // console.log('envFile', envFile);

    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    // console.log('this.envConfig', this.envConfig);
  }

  sayHi() {
    return 'hi from FirstService ' + JSON.stringify(this.envConfig);
  }
}

@Module({
  providers: [FirstService],
})
class FirstModule {}

///////////////////
@Injectable({ scope: Scope.DEFAULT })
export class SecondService {
  constructor() {
    console.log('===SECOND MODULE===');
  }

  sayHi() {
    return 'hi from SecondService';
  }
}

@Module({
  // imports: [forwardRef(() => PostsModule)],
  providers: [SecondService],
  exports: [SecondService],
})
export class SecondModule {}
