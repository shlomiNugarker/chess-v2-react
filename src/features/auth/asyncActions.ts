import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { authService } from '../../services/authService'
import { socketService } from '../../services/socketService'
import { userService } from '../../services/userServise'

export const signUp = createAsyncThunk(
  'auth/signup',
  async (
    userCred: {
      username: string
      password: string
      fullname: string
    },
    thunkApi
  ) => {
    try {
      const user = await authService.signup(userCred)
      return user
    } catch (err) {
      console.log('cannot signup:', err)
      if (err instanceof Error) return thunkApi.rejectWithValue(err.message)
    }
  }
)
export const login = createAsyncThunk(
  'auth/login',
  async (
    userCred: {
      username: string
      password: string
    },
    thunkApi
  ) => {
    try {
      const user = await authService.login(userCred)
      socketService.emit('setUserSocket', user._id)
      return user
    } catch (err) {
      console.log('cannot login:', err)
      if (err instanceof Error) return thunkApi.rejectWithValue(err.message)
    }
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (data, thunkApi) => {
    try {
      await authService.logout()
    } catch (err) {
      console.log('cannot login:', err)
      if (err instanceof Error) return thunkApi.rejectWithValue(err.message)
    }
  }
)
export const setLocalUser = createAsyncThunk(
  'auth/setLocalUser',
  async (newUser: User, thunkApi) => {
    try {
      const savedUser: User = await userService.saveUser(newUser)
      return savedUser
    } catch (err) {
      console.log('cannot login:', err)
      if (err instanceof Error) return thunkApi.rejectWithValue(err.message)
    }
  }
)
