import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { Blog } from '../entity/blog.entity';
import { BlogMiddleware } from './blog.middleware';
import { multerBlog } from './blog.multer';
import { BlogService } from './blog.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), MulterModule.register(multerBlog), UserModule],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BlogMiddleware).forRoutes('blog');
  }
}
