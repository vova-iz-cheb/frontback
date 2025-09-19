import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Users } from '../decorators/users.decorator';

@Injectable()
export class MyFirstGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('*** GUARD getClass', context.getClass().name);
    console.log('*** GUARD getHandler', context.getHandler().name);

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const users = this.reflector.get(Users, context.getHandler());
    const users2 = this.reflector.get(Users, context.getClass());
    console.log('users', users);
    console.log('users2', users2);

    const money = this.reflector.get('money', context.getHandler());
    const money2 = this.reflector.get('money', context.getClass());
    console.log('money', money);
    console.log('money2', money2);

    const user3 = this.reflector.getAllAndOverride(Users, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user4 = this.reflector.getAllAndOverride(Users, [
      context.getClass(),
      context.getHandler(),
    ]);
    console.log('user3', user3);
    console.log('user4', user4);

    console.log('ctx method', req.method);
    console.log('ctx url', req.url);

    if (req.method === 'POST' && req.url.startsWith('/users')) {
      const name = req.body?.name;

      console.log('name', name);

      if (name?.includes('admin')) {
        throw new ForbiddenException(
          'Нельзя создавать пользователя с именем admin',
        );
      }
    }

    return true;
  }
}
