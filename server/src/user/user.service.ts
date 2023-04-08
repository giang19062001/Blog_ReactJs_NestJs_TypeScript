import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Blog } from 'src/entity/blog.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const userEmail = await this.userRepository.findOneBy({
      email: createUserDto.email
    });
    const userPhone = await this.userRepository.findOneBy({
      phone: createUserDto.phone
    });
    if (userEmail) {
      throw new HttpException('Email đã được sử dụng', HttpStatus.BAD_REQUEST);
    } else if (userPhone) {
      throw new HttpException('Số điện thoại đã được sử dụng', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async updateBlogs(id: number, blog: Blog) {
    const user = await this.userRepository.findOneBy({ id: id });
    const userUpdateBlogs = new User();
    userUpdateBlogs.id = user.id;
    userUpdateBlogs.address = user.address;
    userUpdateBlogs.email = user.email;
    userUpdateBlogs.dob = user.dob;
    userUpdateBlogs.name = user.name;
    userUpdateBlogs.password = user.password;
    userUpdateBlogs.phone = user.phone;
    userUpdateBlogs.blogs = `{ ${[...user.blogs, blog.id]} }`;
    console.log('user', user);
    console.log('userUpdateBlogs', userUpdateBlogs);

    return this.userRepository.update(id, userUpdateBlogs);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      email: loginUserDto.email
    });

    if (!user) {
      throw new HttpException('Tài khoản không tồn tại', HttpStatus.NOT_FOUND);
    }
    const is_equal = bcrypt.compareSync(loginUserDto.password, user.password);

    if (!is_equal) {
      throw new HttpException('Mật khẩu không chính xác', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
