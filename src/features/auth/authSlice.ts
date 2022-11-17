import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { authService } from '../../services/authService'

import { login, logout, setLocalUser, signUp } from './asyncActions'

interface authState {
  loggedInUser: User | null
}

const initialState: authState = { loggedInUser: authService.getLoggedinUser() }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setLocalUser: (state, action) => {
    //   if (!state) return
    //   console.log(action.payload)
    //   state.loggedInUser = action.payload
    // },
  },
  extraReducers(builder) {
    builder
      //signup:
      .addCase(signUp.pending, (state, action) => {
        console.log('panding')
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log('fulfilled:', action.payload)
        state.loggedInUser = action.payload
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        console.log('rejected:', action.payload)
      })
      // login:
      .addCase(login.fulfilled, (state, action) => {
        console.log('login fulfilled:', action.payload)
        state.loggedInUser = action.payload
      })
      //logout:
      .addCase(logout.fulfilled, (state, action) => {
        console.log('logout fulfilled:', action.payload)
        state.loggedInUser = null
      })
      .addCase(setLocalUser.fulfilled, (state, action) => {
        console.log('logout fulfilled:', action.payload)
        if (action.payload) state.loggedInUser = action.payload
      })
  },
})

export const {} = authSlice.actions
export default authSlice.reducer
