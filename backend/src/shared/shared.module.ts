import { Global, Module } from '@nestjs/common';
import { Helper1 } from './shared.services';

export const symbolValue = Symbol('value');

@Global()
@Module({
  providers: [
    {
      provide: Helper1,
      useClass: Helper1,
    },
    {
      provide: 'BLAH',
      useClass: Helper1,
    },
    {
      provide: symbolValue,
      useValue: {
        getHello() {
          return 'hello';
        },
      },
    },
  ],
  exports: [Helper1, 'BLAH', symbolValue],
})
export class SharedModule {}
