import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { blogApi } from 'redux/blog/blog.service'
import blogReducer from 'redux/blog/blog.slice'
import { userApi } from 'redux/user/user.service'
import userReducer from 'redux/user/user.slice'
import { rtkQueryErrorLogger } from 'utils/middleware'


export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer, // thêm reducer duoc tao từ api slice
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorLogger)
  }
  // thêm middleware để enable các tính nang caching invalidation poling 
})

setupListeners(store.dispatch)
// nếu có dùng tính nang refreshOnFocus or refreshOnReconnect thì setup thêm dòng này


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
