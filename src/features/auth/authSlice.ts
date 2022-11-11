import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User'

import { login, logout, signUp } from './asyncActions'

interface authState {
  loggedInUser: User | null
}

const initialState: authState = { loggedInUser: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
      .addCase(login.pending, (state, action) => {
        console.log('login panding')
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('login fulfilled:', action.payload)
        state.loggedInUser = action.payload
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        console.log('login rejected:', action.payload)
      })
      //logout:
      .addCase(logout.pending, (state, action) => {
        console.log('logout panding')
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log('logout fulfilled:', action.payload)
        state.loggedInUser = null
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        console.log('logout rejected:', action.payload)
      })
  },
})

export const {} = authSlice.actions
export default authSlice.reducer
