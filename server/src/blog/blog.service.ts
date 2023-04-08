import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { Blog } from '../entity/blog.entity';

@Injectable()
export class BlogService {
  // @Inject(UserService)
  // private readonly userService: UserService; // xài service từ bên khác phải inject
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ) {}
  create(createBlogDto: CreateBlogDto) {
    return this.blogRepository.save(createBlogDto);
  }

  findAll() {
    return this.blogRepository.find();
  }

  findOne(id: number) {
    return this.blogRepository.findOneBy({ id: id });
  }

  async findOneByTitle(createBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.findOneBy({
      title: createBlogDto.title,
      description: createBlogDto.description
    });
    return blog;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogRepository.update(id, updateBlogDto);
  }

  remove(id: number) {
    return this.blogRepository.delete(id);
  }
}
