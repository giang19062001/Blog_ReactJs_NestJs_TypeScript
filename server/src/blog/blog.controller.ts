import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Inject,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { BlogInterceptor } from './blog.interceptor';
import { BlogService } from './blog.service';
import { UserService } from 'src/user/user.service';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

// 2023-03-22T22:17

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  @Inject(UserService)
  private readonly userService: UserService; // xài service từ bên khác phải inject
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateBlogDto
  })
  @ApiImplicitFile({ name: 'featuredImage' })
  @UseInterceptors(FileInterceptor('featuredImage'))
  async create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() file: Express.Multer.File) {
    try {
      await this.blogService.create({ ...createBlogDto, featuredImage: file.filename });
      const blog = await this.blogService.findOneByTitle(createBlogDto);
      const user = await this.userService.findOne(blog.user);
      return this.userService.updateBlogs(user.id, blog);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateBlogDto
  })
  @UseInterceptors(FileInterceptor('featuredImage'))
  @UseInterceptors(BlogInterceptor)
  async update(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('controller   ', updateBlogDto);
    const blog = await this.blogService.findOne(id);
    if (file === undefined) {
      await this.blogService.update(id, { ...updateBlogDto, featuredImage: blog.featuredImage });
      return this.blogService.findOne(id);
    } else {
      await fs.unlinkSync('images/blog/' + blog.featuredImage);
      await this.blogService.update(id, { ...updateBlogDto, featuredImage: file.filename });
      return this.blogService.findOne(id);
    }
  }

  @Get('')
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const blog = await this.blogService.findOne(id);
    await fs.unlinkSync('images/blog/' + blog.featuredImage);
    await this.blogService.remove(id);
    return 'delete success';
  }
}
