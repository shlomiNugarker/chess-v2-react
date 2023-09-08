import { ChatState } from '../../../models/ChatState'
import { SaveChat } from '../../../models/SaveChat'
import { chatService } from '../../chatService'
import { socketService } from '../../socketService'

export const saveChat: SaveChat = async (chat: ChatState, setChatState) => {
  const savedChat = await chatService.save(chat)
  if (chat._id && chat.userId && chat.userId2)
    socketService.emit('chat-updated', savedChat)
  setChatState(savedChat)
  return savedChat
}
