import { createAsyncThunk } from '@reduxjs/toolkit'
import { Chat } from '../../models/Chat'
import { chatService } from '../../services/chatService'
import { socketService } from '../../services/socketService'

export {}

export const getChatById = createAsyncThunk(
  'chat/getChatById',
  async (chatId: string, thunkApi) => {
    try {
      const chat = chatService.getById(chatId)
      return chat
    } catch (err) {
      console.log('cannot getChatById:', err)
      if (err instanceof Error) return thunkApi.rejectWithValue(err.message)
    }
  }
)
export const saveChat = createAsyncThunk(
  'chat/saveChat',
  async (chat: Chat, thunkApi) => {
    try {
      const savedChat = await chatService.save(chat)
      // if (chat._id && chat.userId && chat.userId2)
      socketService.emit('chat-updated', savedChat)
      return savedChat
    } catch (err) {
      console.log('cannot saveChat:', err)
      if (err instanceof Error) return thunkApi.rejectWithValue(err.message)
    }
  }
)
