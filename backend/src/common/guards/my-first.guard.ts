import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyFirstGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('*** GUARD');

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

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
