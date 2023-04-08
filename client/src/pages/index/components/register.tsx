import React, { useEffect, useState } from 'react'
import { openLoginType } from '..'
import { User } from 'interface/user.type'
import { useAddUserMutation } from 'redux/user/user.service'
import { toast } from 'react-toastify'
import { statusSuccess } from 'utils/status'

const initalState: Omit<User, 'id'> = {
  name: '',
  phone: '',
  email: '',
  address: '',
  dob: '',
  password: ''
}

export const Register = ({ openLogin }: openLoginType) => {
  const [formData, setFormData] = useState<Omit<User, 'id'> | User>(initalState)
  const [register, registerResult] = useAddUserMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await register(formData).unwrap()
    setFormData(initalState)
  }
  useEffect(() => {
    if (registerResult.isSuccess && registerResult.isSuccess === true) {
      toast.success(statusSuccess.RegisterSuccess)
    }
  }, [registerResult.isSuccess])
  console.log(registerResult)
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
              <div></div>
              <div className='mb-6 flex flex-row gap-5'>
                <div>
                  <label htmlFor='enail' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    placeholder='vui lòng nhập email...'
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor='name' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Họ tên
                  </label>
                  <input
                    type='name'
                    id='name'
                    className='block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    placeholder='vui lòng nhập họ tên...'
                    required
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </div>
              </div>

              <div className='mb-6 flex flex-row gap-5'>
                <div>
                  <label htmlFor='address' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Địa chỉ
                  </label>
                  <textarea
                    id='address'
                    rows={3}
                    className='block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    placeholder='vui lòng nhập email...'
                    required
                    value={formData.address}
                    onChange={(event) => setFormData((prev) => ({ ...prev, address: event.target.value }))}
                  />
                </div>
                <div className=''>
                  <label htmlFor='dob' className={'mb-2 block text-sm font-medium  text-gray-900 dark:text-gray-300'}>
                    Ngày sinh
                  </label>
                  <input
                    type='date'
                    id='dob'
                    className={
                      'block w-56 rounded-lg border  border-gray-300 bg-gray-50  p-2.5   text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    }
                    required
                    value={formData.dob}
                    onChange={(event) => setFormData((prev) => ({ ...prev, dob: event.target.value }))}
                  />
                </div>
              </div>
              <div className='mb-6 flex flex-row gap-5'>
                <div>
                  <label htmlFor='phone' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Số điện thoại
                  </label>
                  <input
                    type='text'
                    id='phone'
                    className='block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    placeholder='vui lòng nhập email...'
                    required
                    value={formData.phone}
                    onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Mật khẩu
                  </label>
                  <input
                    type='password'
                    id='password'
                    className='block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                    placeholder='vui lòng nhập mật khẩu...'
                    required
                    value={formData.password}
                    onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                  />
                </div>
              </div>

              <hr className='my-8' />
              <div className='flex flex-col justify-center gap-5 '>
                <button
                  className='group relative mx-auto inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
                  type='submit'
                >
                  <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                    Đăng ký
                  </span>
                </button>
                <button type='button' className='font-bold text-sky-500 hover:scale-105 ' onClick={() => openLogin()}>
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
