import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chat } from '../../models/Chat'

import { getChatById, saveChat } from './asyncActions'

const initialState: Chat | null = null

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState as Chat | null,
  reducers: {
    setChat: (state, action) => {
      if (!state) return
      state.userId = action.payload.userId
      state.userId2 = action.payload.userId2
      state.messages = action.payload.messages
      state.createdAt = action.payload.createdAt
    },
    updateStateChatFromSocket: (state, action) => {
      if (!state) return
      console.log(action.payload)

      state._id = action.payload._id
      state.userId = action.payload.userId
      state.userId2 = action.payload.userId2
      state.messages = action.payload.messages
      state.createdAt = action.payload.createdAt
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getChatById.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(saveChat.fulfilled, (state, action) => {
        return action.payload
      })
  },
})

export const { setChat, updateStateChatFromSocket } = chatSlice.actions
export default chatSlice.reducer
