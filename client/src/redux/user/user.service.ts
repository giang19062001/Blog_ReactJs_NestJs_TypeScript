import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginUser, User } from 'interface/user.type'

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER
  }),
  endpoints: (build) => ({
    getUser: build.query<User, number | null>({
      query: (id) => `user/${id}`
    }),

    addUser: build.mutation<User, Omit<User, 'id'>>({
      query(body) {
        return {
          url: 'user',
          method: 'POST',
          body: body
        }
      },
    }),
    login: build.mutation<LoginUser, LoginUser>({
      query(body) {
        return {
          url: 'user/login',
          method: 'POST',
          body: body
        }
      },
    })
  })
})

export const { useGetUserQuery, useAddUserMutation, useLoginMutation } = userApi
