import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PersonInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('...before', context);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`After...${Date.now() - now}ms`);
      }),
    );
  }
}
