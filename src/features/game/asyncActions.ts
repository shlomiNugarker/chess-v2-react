import { createAsyncThunk } from '@reduxjs/toolkit'

// ACTION
export const getJoke = createAsyncThunk(
  'game/getJoke',
  async (data, thunkApi) => {
    try {
      const res = await fetch('https://api.chucknorris.io/jokes/random')
      const data = await res.json()
      return data.value
    } catch (err: any) {
      console.log(err)
      return thunkApi.rejectWithValue(err.message)
    }
  }
)
