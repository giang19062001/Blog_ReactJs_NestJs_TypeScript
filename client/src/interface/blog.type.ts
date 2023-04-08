import { User } from "./user.type"

export interface Blog {
  title: string
  description: string
  id: number
  featuredImage: string
  user: number
}

export interface BlogState {
  blogList: Blog[]
  blogId: number | null
}

export interface BlogItemType {
  blog: Blog
  startEdit: (id: number) => void
  HandleDeleteBlog: (id: number) => void
}
