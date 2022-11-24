import { Chat } from '../models/Chat'
import { authService } from './authService'
import { httpService } from './httpService'
import { utilService } from './utilService'

export const chatService = {
  createChat,
  save,
  getById,
}

async function createChat(): Promise<Chat> {
  const loggedInUser = authService.getLoggedinUser()
  const newChat: Chat = {
    userId: loggedInUser?._id || '',
    userId2: '',
    messages: [],
    createdAt: new Date().getTime(),
  }
  const savedChat: Chat = await httpService.post('chat', newChat)
  return savedChat
}

async function getById(chatId: string): Promise<Chat> {
  return await httpService.get('chat/' + chatId)
}

async function save(chat: Chat): Promise<Chat> {
  return chat._id
    ? await httpService.put(`chat/${chat._id}`, chat)
    : await httpService.post('chat/', chat)
}
