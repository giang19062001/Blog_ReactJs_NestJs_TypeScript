import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Blog } from 'interface/blog.type'
import { useAddBlogMutation, useGetBlogQuery, useUpdateBlogMutation } from 'redux/blog/blog.service'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { cancelEditBlog } from 'redux/blog/blog.slice'
import { isErrorCustom } from 'utils/helper'
import classNames from 'classnames'

const initalState: Omit<Blog, 'id'> = {
  title: '',
  description: '',
  featuredImage: '',
  user: 0
}

export type ErrorForm =
  | {
      [key in keyof typeof initalState]: string
    }
  | null

// day la viet tat cua kieu
// interface ErrorForm
// {
// title: string
// description: string
// publishDate:string,
// featuredImage: string
// published: string
// user: number
// }

// nếu muốn dữ liệu rõ ràng thì dùng type thay vì interface vì type có nhìu kiểu như: tuple,union,...

export default function CreateBlog() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<Omit<Blog, 'id'> | Blog>(initalState)
  const [selectedImage, setSelectedImage] = useState(null)
  const blogId = useSelector((state: RootState) => state.blog.blogId)
  const user = useSelector((state: RootState) => state.user.user)
  const [addPost, addPostResult] = useAddBlogMutation()
  const [updatePost, updatePostResult] = useUpdateBlogMutation()
  const { data } = useGetBlogQuery(blogId, { skip: !blogId })
  // skip là bỏ qua khi blogId là null sẽ ko gọi hàm useGetBlogQuery này

  const errorForm: ErrorForm = useMemo(() => {
    const errorResult = blogId ? updatePostResult.error : addPostResult.error

    if (isErrorCustom(errorResult)) {
      return errorResult.data.error as ErrorForm
    }
    return null
  }, [addPostResult, blogId, updatePostResult])
  //useMemo chỉ render lại khi addPostResult, blogId, updatePostResult thay đổi giá trị

  useEffect(() => {
    if (blogId && data) {
      if (user !== null) {
        setFormData({ ...data, user: user.id })
      }
    } else {
      if (user !== null) {
        setFormData({ ...initalState, user: user.id })
      }
    }
  }, [blogId, data, user])

  const imageChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0])
      setFormData((pre) => ({ ...pre, featuredImage: event.target.files[0] }))
    }
  }
  const removeSelectedImage = () => {
    setSelectedImage(null)
    setFormData((pre) => ({ ...pre, featuredImage: '' }))
  }

  const handleCancelEdit = () => {
    dispatch(cancelEditBlog())
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formData)
    if (blogId) {
      await updatePost({ id: blogId, body: formData as Blog })
        .unwrap()
        .then(() => dispatch(cancelEditBlog))
      //vì formdata có 2 kiểu là có Id và ko có Id ( sử dụng as Blog để báo formdata này là kiểu có Id)
    } else {
      await addPost(formData).unwrap()
    }
    setFormData(initalState)
    setSelectedImage(null)
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleCancelEdit}>
      <div className='flex items-center gap-12'>
        <div className='mb-6'>
          <label
            htmlFor='publishDate'
            className={classNames('mb-2 block text-sm font-medium  dark:text-gray-300', {
              'text-red-700': errorForm?.title,
              'text-gray-700': !errorForm?.title
            })}
          >
            Title
          </label>
          <input
            type='text'
            id='publishDate'
            className={classNames('block w-56 rounded-lg border   p-2.5  text-sm focus:outline-none ', {
              'border-red-500 bg-red-500 text-red-900 placeholder-red-700 focus:border-red-500': errorForm?.title,
              ' border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500': !errorForm?.title
            })}
            placeholder='Title'
            required
            value={formData.title}
            onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
          />
          {errorForm?.title ? <p className='text-red-700 dark:text-red-300'>{errorForm?.title}</p> : null}
        </div>
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Description
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            required
            value={formData.description}
            onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
      </div>
      <div className='my-6'>
        <div className='flex items-center gap-12'>
          {selectedImage ? (
            <div className='relative my-6'>
              <img src={URL.createObjectURL(selectedImage)} alt='' loading='lazy' />
              <button
                className='absolute top-4 left-4 rounded-full bg-red-500 p-2 text-slate-50'
                onClick={removeSelectedImage}
              >
                Xóa
              </button>
            </div>
          ) : data ? (
            <img
              src={process.env.REACT_APP_SERVER + '/blog/' + formData.featuredImage}
              loading='lazy'
              alt={formData.title}
              className='object-cover object-center transition duration-200 group-hover:scale-110'
            />
          ) : null}
          <button
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            type='button'
          >
            <label
              htmlFor='photo'
              className='relative cursor-pointer rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'
            >
              Chọn ảnh
            </label>
          </button>

          <input
            style={{ display: 'none' }}
            type='file'
            id='photo'
            name='photo'
            accept='image/png, image/jpg, image/jpeg'
            onChange={(event) => imageChange(event)}
          />
        </div>
      </div>

      <div>
        {!blogId ? (
          <Fragment>
            <button
              className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
              type='submit'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Thêm
              </span>
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Lưu
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Hủy bỏ
              </span>
            </button>{' '}
          </Fragment>
        )}
      </div>
    </form>
  )
}
