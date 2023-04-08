import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from 'redux/user/user.slice'
import { RootState } from 'store'

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/')
  }
  return (
    <div className='mb-12 flex flex-row items-center justify-center gap-5 border-2 border-sky-500 p-6'>
      <h1 className='text-2xl font-bold text-red-500'>{user?.name}</h1>
      <button
        type='button'
        onClick={() => handleLogout()}
        className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
      >
        <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          Đăng xuất
        </span>
      </button>{' '}
    </div>
  )
}
