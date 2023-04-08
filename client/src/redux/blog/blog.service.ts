import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Blog } from 'interface/blog.type'

const createFormData = (body: Omit<Blog, 'id'>) => {
  const formdata = new FormData()
  formdata.append('title', body.title)
  formdata.append('description', body.description)
  formdata.append('featuredImage', body.featuredImage)
  formdata.append('user', String(body.user))

  return formdata
}

// tất cả các fetch đều được subscribe lưu data vào ram (cache)
export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Blogs'], // KIỂU tag cho phép ng dùng trong blogApi
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER,
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer ACCESS_TOKEN')
      return headers
    }
  }),
  endpoints: (build) => ({
    getBlogs: build.query<Blog[], void>({
      // vì get ko truyền tham số gì nên là void
      query: () => 'blog',
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Blogs' as const, id })),
            { type: 'Blogs' as const, id: 'LIST_BLOG' }
          ]
          console.log('final', final)
          return final
        }
        // thêm as const để báo type là Blogs chứ ko phải string (readonly)
        return [{ type: 'Blogs' as const, id: 'LIST_BLOG' }]
      }
    }),
    getBlog: build.query<Blog, number | null>({
      query: (id) => `blog/${id}`
    }),
    deleteBlog: build.mutation<{}, number | null>({
      // Nếu hàm ko trả về giá trị gì thì để {}
      query(id) {
        return {
          url: `blog/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, data) => [{ type: 'Blogs', data }]
    }),

    addBlog: build.mutation<Blog, Omit<Blog, 'id'>>({
      query(body) {
        const formdata = createFormData(body)
        return {
          url: 'blog',
          method: 'POST',
          body: formdata
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Blogs', id: 'LIST_BLOG' }])
      //invalidatesTags báo hiệu những method nào có providesTags mà match với type tag sẽ thì sẽ gọi lại hàm đó
      // nếu có error lỗi thì ko gọi lại api
    }),
    updateBlog: build.mutation<Blog, { id: number; body: Blog }>({
      query(data) {
        if (typeof data.body.featuredImage === 'string') {
          const formdata = createFormData({ ...data.body, featuredImage: '' })
          return {
            url: `blog/${data.id}`,
            method: 'PUT',
            body: formdata
          }
        } else {
          const formdata = createFormData(data.body)
          return {
            url: `blog/${data.id}`,
            method: 'PUT',
            body: formdata
          }
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Blogs', id: 'LIST_BLOG' }])
      // id = data.id khi mà ta thật sự biết id đó là gì và đã tồn tại trước đó r
    })
  })
})

//query thì dành cho get
//mutation post put delete

export const { useGetBlogsQuery, useAddBlogMutation, useGetBlogQuery, useUpdateBlogMutation, useDeleteBlogMutation } =
  blogApi
