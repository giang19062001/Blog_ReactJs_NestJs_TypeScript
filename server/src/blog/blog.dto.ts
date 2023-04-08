import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/entity/user.entity';
export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  user: number;
  @ApiProperty({ type: 'string', format: 'binary' })
  featuredImage: string;
}

export class UpdateBlogDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  user: number;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  featuredImage: string;
}
