import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, userState } from 'interface/user.type'

const initialState: userState = {
  user: null
}

const userSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    logOut: (state, action: PayloadAction<void>) => {
      state.user = null
    }
  }
})

const userReducer = userSlice.reducer
export const { saveUser, logOut } = userSlice.actions
export default userReducer
