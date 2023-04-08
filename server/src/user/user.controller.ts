import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Post('login')
  @ApiBody({
    type: LoginUserDto
  })
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.userService.login(LoginUserDto);
  }
  @Post()
  @ApiBody({
    type: CreateUserDto
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
}
