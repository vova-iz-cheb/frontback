import { forwardRef, Injectable, Module } from '@nestjs/common';
import { ModuleB } from './mong.module';

@Injectable()
export class ServiceA {}

@Module({
  imports: [forwardRef(() => ModuleB)],
  providers: [ServiceA],
  exports: [ServiceA],
})
export class ModuleA {}
