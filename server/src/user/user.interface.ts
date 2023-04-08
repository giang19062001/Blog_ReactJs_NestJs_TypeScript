import { Blog } from 'src/entity/blog.entity';

export interface UserInterface {
  name: string;
  phone: string;
  address: string;
  email: string;
  dob: string;
  blogs: Blog[];
  featuredImage: string;
}
