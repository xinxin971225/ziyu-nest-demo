import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PersonGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('PersonGuard', context);
    const classMetaData = this.reflector.get('roles', context.getClass());
    const methodMetaData = this.reflector.get('roles', context.getHandler());
    console.log('PersonGuard', classMetaData, methodMetaData);

    return true;
  }
}
