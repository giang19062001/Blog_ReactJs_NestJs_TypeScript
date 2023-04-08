import { AnyAction, isRejectedWithValue, Middleware, isRejected, MiddlewareAPI } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { isPayloadErrorMessage } from './helper'

// lỗi chung thì viết trong middleware
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejectedWithValue(action)) {
    // Mỗi khi thực hiện query hoặc mutation mà bị lỗi thì nó sẽ chạy vào đây
    // Những lỗi từ server thì action nó mới có rejectedWithValue = true
    // Còn những action liên quan đến việc caching mà bị rejected thì rejectedWithValue = false, nên đừng lo lắng, nó không lọt vào đây được
    if (isPayloadErrorMessage(action.payload)) {
      if (typeof action.payload.data.message === 'string') {
        toast.error(action.payload.data.message)
      } else if (typeof action.payload.data.message === 'object') {
        toast.error(JSON.stringify(action.payload.data.message[0]))
      }
    }
  }

  return next(action)
}
