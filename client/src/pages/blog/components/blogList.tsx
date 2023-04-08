import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startEditBlog } from 'redux/blog/blog.slice'
import { useDeleteBlogMutation, useGetBlogsQuery } from 'redux/blog/blog.service'
import { SkeletonBlog } from './skeletonBlog'
import BlogItem from './blogItem'

const BlogList = () => {
  //isLoading chỉ dành cho lần fetch đầu tiên
  //isFetching là cho mỗi lần gọi api
  const dispatch = useDispatch()
  const [deleteBlog] = useDeleteBlogMutation()
  const { data, isFetching, isLoading } = useGetBlogsQuery()

  const startEdit = (id: number) => {
    dispatch(startEditBlog(id))
  }

  const HandleDeleteBlog = (id: number) => {
    deleteBlog(id)
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-sky-500 md:mb-6 lg:text-3xl'>FACEBOOK.COM</h2>
          
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {isFetching && (
            <Fragment>
              <SkeletonBlog></SkeletonBlog>
              <SkeletonBlog></SkeletonBlog>
            </Fragment>
          )}
          {!isFetching &&
            data?.map((blog) => (
              <BlogItem blog={blog} key={blog.id} startEdit={startEdit} HandleDeleteBlog={HandleDeleteBlog}></BlogItem>
            ))}
        </div>
      </div>
    </div>
  )
}
export default BlogList
