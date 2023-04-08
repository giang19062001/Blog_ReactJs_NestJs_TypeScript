import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BlogState } from 'interface/blog.type'

const initialState: BlogState = {
  blogList: [],
  blogId: null
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditBlog: (state, action: PayloadAction<number>) => {
      state.blogId = action.payload
    },
    cancelEditBlog: (state) => {
      state.blogId = null
    }
  }
})

const blogReducer = blogSlice.reducer
export const { startEditBlog, cancelEditBlog } = blogSlice.actions
export default blogReducer
