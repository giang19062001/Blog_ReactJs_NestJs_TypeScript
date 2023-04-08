import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, RelationId } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, length: 10 })
  phone: string;

  @Column()
  dob: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column('integer', { array: true, default: {} })
  @OneToMany(() => Blog, (blogs) => blogs.user)
  blogs: any;
}
