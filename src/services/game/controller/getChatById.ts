import { ChatState } from '../../../models/ChatState'
import { chatService } from '../../chatService'

export const getChatById = async (
  chatId: string,
  setChatState: React.Dispatch<React.SetStateAction<ChatState | null>>
) => {
  const chat = await chatService.getById(chatId)
  setChatState(chat)
  return chat
}
