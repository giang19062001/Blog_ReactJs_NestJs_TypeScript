import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Blog } from './entity/blog.entity';
import { BlogModule } from './blog/blog.module';
import { User } from './entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'blog',
      entities: [Blog, User],
      autoLoadEntities: true,
      synchronize: true //không nên được sử dụng trong sản xuất - có thể mất dữ liệu
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images')
    }),
    BlogModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
