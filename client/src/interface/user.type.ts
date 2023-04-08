import { Blog } from "./blog.type"

export interface User {
  name: string
  phone: string
  id: number
  email: string
  address: string
  dob: string
  password: string
  // blogs: Blog[]
}

export interface LoginUser {
  email: string
  password: string
}

export interface userState {
  user: User | null
}
