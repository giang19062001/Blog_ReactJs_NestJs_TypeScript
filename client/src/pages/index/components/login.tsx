import React, { useEffect, useState } from 'react'
import { closeLoginType } from '..'
import { LoginUser } from 'interface/user.type'
import { useLoginMutation } from 'redux/user/user.service'
import { useDispatch } from 'react-redux'
import { saveUser } from 'redux/user/user.slice'
import { useNavigate } from 'react-router-dom'

const initalState: LoginUser = {
  email: '',
  password: ''
}

export const Login = ({ closeLogin }: closeLoginType) => {
  const [formData, setFormData] = useState<LoginUser>(initalState)
  const [login, loginResult] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await login(formData).unwrap()
  }
  useEffect(() => {
    if (loginResult.isSuccess && loginResult.data) {
      dispatch(saveUser(loginResult.data))
      navigate('/blog')
    }
  }, [dispatch, loginResult.data, loginResult.isSuccess, navigate])
  console.log(loginResult)

  return (
    <section className='h-screen'>
      <div className='h-full'>
        <div className='g-6 flex h-full flex-wrap items-center justify-center '>
          <div className='shrink-1 mb-12 grow-0 basis-auto'>
            <img
              src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
              className='w-auto'
              alt='Sample image'
            />
          </div>
          <div className='shrink-1 mb-12'>
            <div>
              <h1 className='mb-6 text-center text-3xl font-bold text-sky-700'>FACEBOOK.com</h1>
            </div>
            <form className='rounded-lg border-2 border-sky-500 p-12' onSubmit={handleSubmit}>
              <div className='mb-6'>
                <div>
                  <label htmlFor='Email' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Email
                  </label>
                  <input
                    type='Email'
                    id='description'
                    className='block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    placeholder='vui lòng nhập email...'
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>
              </div>
              <div className='mb-6'>
                <div>
                  <label htmlFor='Password' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Mật khẩu
                  </label>
                  <input
                    type='Password'
                    id='Password'
                    className='block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    placeholder='vui lòng nhập mật khẩu...'
                    required
                    value={formData.password}
                    onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                  />
                </div>
              </div>
              <div className='flex flex-col justify-center gap-3'>
                <button
                  className='group relative mx-auto inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
                  type='submit'
                >
                  <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                    Đăng nhập
                  </span>
                </button>
                <button type='button' className='font-bold text-sky-500 hover:scale-105' onClick={() => closeLogin()}>
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
