import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

// thu hẹp kiểu error ko xác dịnh về SerializedError
// lỗi do phía client của thunk nếu ta trycatch throw ra lỗi thì SerializedError {  name?: string, message?: string, stack?: string, code?: string}
// export function isSerializedError(error: unknown): error is { message: string } {
//   return typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
// }

// thu hẹp kiểu error ko xác dịnh về fetchBaseQueryError
// lỗi do gọi api mà bị lỗi bắt thì FetchBaseQueryError {status: number, data: unknown}
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}

//ErrorCustom bao quát
interface ErrorCustom {
  [key: string | number]: string | EntiryError | EntiryError[]
  //vd: publishDate(string): 'publish Date cannot less than date now multer(string)'
}
interface EntiryError {
  status: number
  data: {
    error: ErrorCustom
    //vd:  ErrorCustom = publishDate: 'publish Date cannot less than date now multer'
  }
}
//// thu hẹp kiểu error ko xác dịnh lien quan đến post put (pipe)
export function isErrorCustom(error: unknown): error is EntiryError {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  )
  //instanceof check data ko phải array
}

// xử lý lỗi chung cho middleware
interface CommonError_PipeError {
  data: {
    error?: string
    message:
      | string
      | {
          0: string
        }
    statusCode: number
  }
  status: number
}

export function isPayloadErrorMessage(payload: unknown): payload is CommonError_PipeError {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    (typeof (payload as any).data?.message === 'string' || typeof (payload as any).data?.message === 'object')
  )
}
