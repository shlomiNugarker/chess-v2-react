import { ChatState } from '../models/ChatState'
import { authService } from './authService'
import { httpService } from './httpService'

export const chatService = {
  createChat,
  save,
  getById,
}

async function createChat(): Promise<string> {
  const loggedInUser = authService.getLoggedinUser()
  const newChat: ChatState = {
    userId: loggedInUser?._id || '',
    userId2: '',
    messages: [],
    createdAt: new Date().getTime(),
  }
  const id: string = await httpService.post('chat', newChat)
  return id
}

async function getById(chatId: string): Promise<ChatState> {
  return await httpService.get('chat/' + chatId)
}

async function save(chat: ChatState): Promise<ChatState> {
  return chat._id
    ? await httpService.put(`chat/${chat._id}`, chat)
    : await httpService.post('chat/', chat)
}
