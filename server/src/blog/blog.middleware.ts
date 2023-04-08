import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Blog } from './blog.interface';

@Injectable()
export class BlogMiddleware implements NestMiddleware {
  use(req: Request<unknown, unknown, Blog, unknown>, res: Response, next: NextFunction) {
    console.log('middleware', req.body);
    setTimeout(() => next(), 1000); // giúp server delay để client skeleton
  }
}
