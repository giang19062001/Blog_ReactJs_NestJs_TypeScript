import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, MaxDate } from 'class-validator';
import { Blog } from 'src/entity/blog.entity';
import { statusError } from 'src/utils/status';
export class CreateUserDto {
  @IsNotEmpty()
  @Type(() => Date)
  @MaxDate(new Date(), { message: statusError.PipeDob })
  dob: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10, { message: statusError.PipePhone })
  phone: string;
  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  blogs: number[];
}

export class UpdateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  @Length(10, 10)
  phone: string;
  @ApiProperty()
  @MaxDate(new Date(), { message: statusError.PipeDob })
  dob: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  blogs: number[];
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
