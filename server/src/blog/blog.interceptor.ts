import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Blog, forbiddenTitleBlog } from './blog.interface';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BlogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value: Blog) => {
        if (forbiddenTitleBlog(value.title) === false) {
          return value;
        } else {
          throw new BadRequestException({
            error: {
              title: 'Không nên dùng từ không đúng quy định'
            }
          });
        }
        return value;
      })
    );
  }
}
